// resend-config.js
import axios from 'axios';

const resendApiKey = process.env.RESEND_API_KEY;
const resendApiUrl = process.env.RESEND_API_URL;

export const sendEmail = async (email, docLink, permission) => {
  try {
    console.log('Sending email to:', email);
    const response = await axios.post(
      resendApiUrl,
      {
        from: 'tiwariravikant04@gmail.com', // Sender's email
        to: email,
        subject: 'Document Shared with You',
        html: `
          <h1>Your document has been shared!</h1>
          <p>Document Link: <a href="${docLink}">${docLink}</a></p>
          <p>Permission: ${permission}</p>
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
        },
      }
    );
    console.log('Email sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};
