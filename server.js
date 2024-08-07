
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Add CORS for cross-origin requests

const app = express();
const port = 3000; // Or your desired port

// Middleware (Important for handling form data and cross-origin requests)
app.use(cors()); 
app.use(express.json()); 

// Configure Nodemailer with Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_gmail_username@gmail.com',
    pass: 'your_gmail_password' 
  }
});

// Endpoint for sending emails
app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email, // Use the sender's email
    to: 'shravyakbofficial@gmail.com', 
    subject: `Portfolio Contact Form: ${subject}`, 
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending message');
    } else {
      console.log('Email sent:', info.response);
      res.send('Message sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
