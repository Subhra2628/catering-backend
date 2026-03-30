// const express = require("express");
// const router = express.Router();
// const db = require("../Config/Db");
// const { Resend } = require("resend");

// const resend = new Resend(process.env.RESEND_API_KEY);

// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// router.post("/", async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email required" });

//     await db.query("DELETE FROM otp_codes WHERE email=?", [email]);

//     const emailOtp = generateOTP();
//     const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

//     await db.query(
//       "INSERT INTO otp_codes (email, email_otp, expires_at) VALUES (?, ?, ?)",
//       [email, emailOtp, expiresAt]
//     );

//     await resend.emails.send({
//       from: "Abhinandan Caterer <onboarding@resend.dev>",
//       to: email,
//       subject: "Your OTP Code",
//       text: `Your OTP is: ${emailOtp}. It will expire in 5 minutes.`,
//     });

//     console.log(`OTP sent to ${email}`);
//     res.json({ message: "OTP sent successfully" });
//   } catch (err) {
//     console.error("OTP ERROR:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;