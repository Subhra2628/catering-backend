const express = require("express");
const router = express.Router();
const db = require("../Config/Db");
const nodemailer = require("nodemailer");
const dns = require("dns").promises;

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTPEmail(to, otp) {
  const [ipv4] = await dns.resolve4("smtp.gmail.com");

  const transporter = nodemailer.createTransport({
    host: ipv4,
    port: 587,
    secure: false,
    tls: { servername: "smtp.gmail.com" },
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Abhinandan Caterer" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
  });
}

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    await db.query("DELETE FROM otp_codes WHERE email=?", [email]);

    const emailOtp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await db.query(
      "INSERT INTO otp_codes (email, email_otp, expires_at) VALUES (?, ?, ?)",
      [email, emailOtp, expiresAt]
    );

    await sendOTPEmail(email, emailOtp);

    console.log(`OTP sent to ${email}`);
    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("OTP ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;