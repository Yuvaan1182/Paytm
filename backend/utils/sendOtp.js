const logger = require('./logger');
const twilio = require('twilio');

const accountSid = 'your_account_sid'; // Replace with your Twilio Account SID
const authToken = 'your_auth_token';   // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

const sendOtp = async (phone, otp) => {
    try {
        const message = await client.messages.create({
            body: `Your OTP is: ${otp}`,
            from: 'your_twilio_phone_number', // Replace with your Twilio phone number
            to: phone
        });
        logger.info(`OTP sent successfully: ${message.sid}`);
    } catch (error) {
        logger.error(`Error sending OTP: ${error.message}`);
    }
};

module.exports = sendOtp;
