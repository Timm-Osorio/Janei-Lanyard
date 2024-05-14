const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const admin = require('firebase-admin');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Initialize Firebase Admin SDK
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Replace with your service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://janeilanyarddb-9ba85-default-rtdb.firebaseio.com/' // Replace with your database URL
});
const db = admin.database();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password_here'
    }
});

// Forgot password route
app.post('/forgot_password', (req, res) => {
    const email = req.body.email;

    // Generate a password reset token
    const resetToken = randomstring.generate(20);

    // Save the reset token in the database
    db.ref('passwordResetTokens/' + email).set({
        token: resetToken,
        expires: Date.now() + 3600000 // Token expires in 1 hour
    })
    .then(() => {
        // Send password reset link to user's email
        const resetLink = `/janeiwebsite/src/changepass.html=${email}&token=${resetToken}`; // Replace with your frontend URL
        transporter.sendMail({
            from: 'your_email@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `You have requested to reset your password. Click the following link to reset your password: ${resetLink}`
        }, (error, info) => {
            if (error) {
                console.error('Error:', error);
                res.json({ success: false });
            } else {
                console.log('Email sent:', info.response);
                res.json({ success: true });
            }
        });
    })
    .catch(error => {
        console.error('Error generating reset token:', error);
        res.json({ success: false });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
