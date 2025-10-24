const Transaction = require("../../models/transactionModel");
const {
  Types: { ObjectId },
} = require("mongoose");

const getUserAnalyticsSummary = async (req, res) => {
  try {
    const userId = req.userId;

    if (!ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ error: "Invalid user ID" });
    }

    const objectId = new ObjectId(userId);
    const now = new Date();

    const startOfLastWeek = new Date();
    startOfLastWeek.setDate(now.getDate() - 6);
    startOfLastWeek.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const ALL_STATUSES = ["pending", "completed", "failed"];

    const [
      transactionSums,
      categoryBreakdown,
      monthlySpending,
      rawStatusCounts,
      topReceivers,
      rawDailyCount,
      monthlyIncomeExpenseRaw,
      weeklyIncomeExpenseRaw,
      recentTransactions,
    ] = await Promise.all([
      // Credit/Debit summary (excluding failed)
      Transaction.aggregate([
        {
          $addFields: {
            finalStatus: {
              $arrayElemAt: ["$statusHistory.status", -1],
            },
          },
        },
        {
          $match: {
            $or: [
              { senderId: objectId },
              { receiverId: objectId },
            ],
            finalStatus: { $ne: "failed" },
          },
        },
        {
          $project: {
            amount: 1,
            type: {
              $cond: [
                { $eq: ["$senderId", objectId] },
                "debit",
                "credit",
              ],
            },
          },
        },
        {
          $group: {
            _id: "$type",
            total: { $sum: "$amount" },
          },
        },
      ]),

      // Category Breakdown (excluding failed)
      Transaction.aggregate([
        {
          $addFields: {
            finalStatus: {
              $arrayElemAt: ["$statusHistory.status", -1],
            },
          },
        },
        {
          $match: {
            senderId: objectId,
            transactionType: "debit",
            finalStatus: { $ne: "failed" },
          },
        },
        {
          $group: {
            _id: "$category",
            total: { $sum: "$amount" },
          },
        },
        { $sort: { total: -1 } },
      ]),

      // Monthly Spending Trend (excluding failed)
      Transaction.aggregate([
        {
          $addFields: {
            finalStatus: {
              $arrayElemAt: ["$statusHistory.status", -1],
            },
          },
        },
        {
          $match: {
            senderId: objectId,
            finalStatus: { $ne: "failed" },
          },
        },
        {
          $group: {
            _id: {
              year: {
                $year: {
                  date: "$createdAt",
                  timezone: "+05:30",
                },
              },
              month: {
                $month: {
                  date: "$createdAt",
                  timezone: "+05:30",
                },
              },
            },
            total: { $sum: "$amount" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),

      // Status History
      Transaction.aggregate([
        { $match: { senderId: objectId } },
        {
          $group: {
            _id: "$_id",
            statuses: { $push: "$statusHistory.status" },
          },
        },
        {
          $project: {
            finalStatus: {
              $switch: {
                branches: [
                  {
                    case: {
                      $in: [
                        "failed",
                        {
                          $reduce: {
                            input: "$statuses",
                            initialValue: [],
                            in: {
                              $concatArrays: [
                                "$$value",
                                "$$this",
                              ],
                            },
                          },
                        },
                      ],
                    },
                    then: "failed",
                  },
                  {
                    case: {
                      $in: [
                        "completed",
                        {
                          $reduce: {
                            input: "$statuses",
                            initialValue: [],
                            in: {
                              $concatArrays: [
                                "$$value",
                                "$$this",
                              ],
                            },
                          },
                        },
                      ],
                    },
                    then: "completed",
                  },
                ],
                default: "pending",
              },
            },
          },
        },
        {
          $group: {
            _id: "$finalStatus",
            count: { $sum: 1 },
          },
        },
      ]),

      // Top Receivers (excluding failed)
      Transaction.aggregate([
        {
          $addFields: {
            finalStatus: {
              $arrayElemAt: ["$statusHistory.status", -1],
            },
          },
        },
        {
          $match: {
            senderId: objectId,
            finalStatus: { $ne: "failed" },
          },
        },
        {
          $group: {
            _id: "$receiverId",
            totalSent: { $sum: "$amount" },
          },
        },
        { $sort: { totalSent: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        { $unwind: "$userInfo" },
        {
          $project: {
            _id: 1,
            totalSent: 1,
            "userInfo.firstName": 1,
            "userInfo.lastName": 1,
            "userInfo.email": 1,
          },
        },
      ]),

      // Daily Transaction Count
      Transaction.aggregate([
        {
          $addFields: {
            finalStatus: {
              $arrayElemAt: ["$statusHistory.status", -1],
            },
          },
        },
        {
          $match: {
            $or: [
              { senderId: objectId },
              { receiverId: objectId },
            ],
            createdAt: {
              $gte: startOfLastWeek,
              $lte: endOfToday,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
                timezone: "+05:30",
              },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      // ✅ Fixed: Monthly Income vs Expense
      Transaction.aggregate([
        {
          $addFields: {
            finalStatus: {
              $arrayElemAt: ["$statusHistory.status", -1],
            },
          },
        },
        {
          $match: {
            $or: [
              { senderId: objectId },
              { receiverId: objectId },
            ],
            finalStatus: { $ne: "failed" },
          },
        },
        {
          $project: {
            amount: 1,
            createdAt: 1,
            type: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$senderId", objectId] },
                    { $eq: ["$receiverId", objectId] },
                  ],
                },
                "income",
                {
                  $cond: [
                    { $eq: ["$senderId", objectId] },
                    "expense",
                    "income",
                  ],
                },
              ],
            },
          },
        },
        {
          $group: {
            _id: {
              year: {
                $year: {
                  date: "$createdAt",
                  timezone: "+05:30",
                },
              },
              month: {
                $month: {
                  date: "$createdAt",
                  timezone: "+05:30",
                },
              },
              type: "$type",
            },
            total: { $sum: "$amount" },
          },
        },
      ]),

      // ✅ Fixed: Weekly Income vs Expense
      Transaction.aggregate([
        {
          $addFields: {
            finalStatus: {
              $arrayElemAt: ["$statusHistory.status", -1],
            },
          },
        },
        {
          $match: {
            $or: [
              { senderId: objectId },
              { receiverId: objectId },
            ],
            finalStatus: { $ne: "failed" },
            createdAt: {
              $gte: startOfLastWeek,
              $lte: endOfToday,
            },
          },
        },
        {
          $project: {
            amount: 1,
            createdAt: 1,
            type: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$senderId", objectId] },
                    { $eq: ["$receiverId", objectId] },
                  ],
                },
                "income",
                {
                  $cond: [
                    { $eq: ["$senderId", objectId] },
                    "expense",
                    "income",
                  ],
                },
              ],
            },
          },
        },
        {
          $group: {
            _id: {
              date: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$createdAt",
                  timezone: "+05:30",
                },
              },
              type: "$type",
            },
            total: { $sum: "$amount" },
          },
        },
      ]),

      // Recent Transactions
      Transaction.find({
        $or: [
          { senderId: objectId },
          { receiverId: objectId },
        ],
      })
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("senderId", "firstName lastName email")
        .populate("receiverId", "firstName lastName email")
        .lean(),
    ]);

    // Format status count
    const statusMap = {};
    rawStatusCounts.forEach(({ _id, count }) => {
      statusMap[_id] = count;
    });
    const statusCounts = ALL_STATUSES.map((status) => ({
      status,
      count: statusMap[status] || 0,
    }));

    // Format daily counts
    const dailyMap = {};
    rawDailyCount.forEach(({ _id, count }) => {
      dailyMap[_id] = count;
    });
    const dailyTransactionCount = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const formatted = date.toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      });
      dailyTransactionCount.push({
        date: formatted,
        count: dailyMap[formatted] || 0,
      });
    }

    // Format monthly income vs expense
    const monthlyMap = {};
    monthlyIncomeExpenseRaw.forEach(({ _id, total }) => {
      const key = `${_id.year}-${String(_id.month).padStart(
        2,
        "0"
      )}`;
      if (!monthlyMap[key])
        monthlyMap[key] = { income: 0, expense: 0 };
      monthlyMap[key][_id.type] = total;
    });

    const monthlyIncomeExpense = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );
      const key = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      monthlyIncomeExpense.push({
        month: key,
        income: monthlyMap[key]?.income || 0,
        expense: monthlyMap[key]?.expense || 0,
      });
    }

    // Format weekly income vs expense
    const weeklyMap = {};
    weeklyIncomeExpenseRaw.forEach(({ _id, total }) => {
      if (!weeklyMap[_id.date])
        weeklyMap[_id.date] = { income: 0, expense: 0 };
      weeklyMap[_id.date][_id.type] = total;
    });

    const weeklyIncomeExpense = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const formatted = date.toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      });
      weeklyIncomeExpense.push({
        date: formatted,
        income: weeklyMap[formatted]?.income || 0,
        expense: weeklyMap[formatted]?.expense || 0,
      });
    }

    const formattedTopReceivers = topReceivers.map(
      ({ _id, totalSent, userInfo }) => ({
        receiverId: _id,
        amount: totalSent,
        name:
          userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : `${userInfo.firstName}`,
        email: userInfo.email,
      })
    );

    // Clean recentTransactions: flatten statusHistory to a single status field, remove __v/_v, flatten senderId/receiverId, and add sender/receiverName/email
    const cleanRecentTransactions = recentTransactions.map(
      (txn) => {
        let status = "pending";
        if (
          txn.statusHistory &&
          Array.isArray(txn.statusHistory)
        ) {
          const statuses = txn.statusHistory.map(
            (s) => s.status
          );
          if (statuses.includes("failed"))
            status = "failed";
          else if (statuses.includes("completed"))
            status = "completed";
        }
        // Remove __v and _v fields, flatten senderId/receiverId if populated as arrays
        const { __v, _v, statusHistory, ...rest } = txn;
        let sender = rest.senderId;
        let receiver = rest.receiverId;
        // If populated as array, flatten to single object
        if (Array.isArray(sender) && sender.length > 0)
          sender = sender[0];
        if (Array.isArray(receiver) && receiver.length > 0)
          receiver = receiver[0];

        // Set senderId and receiverId to their _id values
        const senderId = sender?._id ? sender._id : sender;
        const receiverId = receiver?._id
          ? receiver._id
          : receiver;

        // Compose sender/receiver name and email
        const senderName =
          sender?.firstName && sender?.lastName
            ? `${sender.firstName} ${sender.lastName}`
            : "";
        const senderEmail = sender?.email || "";
        const receiverName =
          receiver?.firstName && receiver?.lastName
            ? `${receiver.firstName} ${receiver.lastName}`
            : "";
        const receiverEmail = receiver?.email || "";

        // If receiverId is not the current user, make amount negative
        let amount = rest.amount;
        if (
          receiverId?.toString() !== objectId.toString()
        ) {
          amount = -Math.abs(amount);
        }

        // Set transactionType: credit if receiverId is user, else debit
        let transactionType =
          receiverId?.toString() === objectId.toString()
            ? "credit"
            : "debit";

        return {
          ...rest,
          amount,
          senderId,
          receiverId,
          senderName,
          senderEmail,
          receiverName,
          receiverEmail,
          status,
          transactionType,
        };
      }
    );

    res.json({
      transactionSums,
      categoryBreakdown,
      monthlySpending,
      statusCounts,
      topReceivers: formattedTopReceivers,
      dailyTransactionCount,
      monthlyIncomeExpense,
      weeklyIncomeExpense,
      recentTransactions: cleanRecentTransactions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRecentTransactionsByCategory = async (
  req,
  res
) => {
  const userId = req.userId;
  const { selectedUserId } = req.params;

  try {
    const userObjectId = new ObjectId(userId);
    const selectedObjectId = new ObjectId(selectedUserId);

    const recentTransactions = await Transaction.aggregate([
      {
        $match: {
          $or: [
            {
              senderId: userObjectId,
              receiverId: selectedObjectId,
            },
            {
              senderId: selectedObjectId,
              receiverId: userObjectId,
            },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: "$category",
          mostRecent: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$mostRecent" },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    res.json(recentTransactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getIncomeVsExpense = async (req, res) => {
  const userId = req.user.id; // Assuming JWT middleware adds this
  const objectId = new ObjectId(userId);

  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          $or: [
            { senderId: objectId }, // Expenses
            { receiverId: objectId }, // Income
          ],
        },
      },
      {
        $group: {
          _id: "$transactionType",
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Format result
    let income = 0;
    let expense = 0;

    for (const entry of result) {
      if (entry._id === "credit") {
        income = entry.total;
      } else if (entry._id === "debit") {
        expense = entry.total;
      }
    }

    res.json({
      income,
      expense,
      netBalance: income - expense,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUserAnalyticsSummary,
  getRecentTransactionsByCategory,
  getIncomeVsExpense,
};
