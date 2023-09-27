const responseMessages = {
  EN: {
    UNAUTHORIZED_USER: 'Unauthorized.',
    EMAIL_DOES_NOT_EXIST: 'Email does not exists.',
    VERIFICATION_CODE_SENT_TO_EMAIL:
      'Verification code sent to your email please use that code to verify your email',
    LOGIN_SUCCESS: 'Login success',
    INVALID_VERIFICATION_CODE: 'Invalid verification code',
    INVALID_CREDENTIALS: 'Invalid login credentials.',
    PASSWORD_RESET_CODE_SENT: 'Password reset code sent.',
    PROFILE_UPDATED_SUCCESSFULLY: 'Profile updated successfully.',
    OTP_VERIFICATION_FAILED: 'Canot send Otp currently. Try again later',
    SENDING_OTP_EMAIL_TEXT: `Dear Pearlians,

We're excited to have you as a part of the EB Pearls Meeting Room Booking community! To ensure the security of your account, we need to verify your identity. Please follow the instructions below to complete your login:

Verification Code: [Insert OTP Code]

Open the EB Pearls Meeting Room Booking App on your device.
On the login screen, enter the verification code provided above.
Click or tap the "Submit" button.
If you didn't request this verification code or need assistance, please contact our support team at ebInterns@ebpearls.com or +1-8234-235322.

Thank you for choosing EB Pearls Meeting Room Booking App for your meeting room needs. We look forward to serving you!`,
  },
};

let Messages = responseMessages.EN;

export default Messages;
