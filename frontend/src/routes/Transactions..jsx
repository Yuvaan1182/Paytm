import GlassCard from '../components/GlassCard';

const Transactions = () => {
  return (
    <GlassCard className="z-30">
      <h1>Transactions History</h1>
      <ul className="list-disc pl-5">
        <li>Transaction 1</li>
        <li>Transaction 2</li>
        <li>Transaction 3</li>
        <li>Transaction 4</li>
        <li>Transaction 5</li>
      </ul>
      <p className="text-sm text-gray-500">Total Transactions: 5</p>
    </GlassCard>
  );
};

export default Transactions;
