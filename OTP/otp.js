// const express = require("express");
// const router = express.Router();
// const db = require("../Config/Db");
// const nodemailer = require("nodemailer");

// // OTP generator
// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// // transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER, // email
//     pass: process.env.EMAIL_PASS, // app password
//   },
// });

// router.post("/", async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email required" });
// // Delete old OTPs for this email
// await db.query("DELETE FROM otp_codes WHERE email=?", [email]);
//     const emailOtp = generateOTP();
//     const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

//     // Save OTP in DB
//     await db.query(
//       "INSERT INTO otp_codes (email, email_otp, expires_at) VALUES (?, ?, ?)",
//       [email, emailOtp, expiresAt]
//     );

//     // Send OTP via email
//     await transporter.sendMail({
//       from: `"abhinandancaterer",<${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP Code",
//       text: `Your OTP is: ${emailOtp}. It will expire in 5 minutes.`,
//     });

//     console.log(`OTP for ${email}: ${emailOtp}`);
//     res.json({ message: "OTP sent successfully" });
//   } catch (err) {
//     console.error("OTP ERROR:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const db = require("../Config/Db");
const nodemailer = require("nodemailer");

// OTP generator
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4,     
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });
// Delete old OTPs for this email
await db.query("DELETE FROM otp_codes WHERE email=?", [email]);
    const emailOtp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    // Save OTP in DB
    await db.query(
      "INSERT INTO otp_codes (email, email_otp, expires_at) VALUES (?, ?, ?)",
      [email, emailOtp, expiresAt]
    );

    // Send OTP via email
    await transporter.sendMail({
      from: `"abhinandancaterer",<${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${emailOtp}. It will expire in 5 minutes.`,
    });

    console.log(`OTP for ${email}: ${emailOtp}`);
    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("OTP ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;