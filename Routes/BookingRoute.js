// const express = require("express");
// const router = express.Router();
// const db = require("../Config/Db");

// router.post("/", async (req, res) => {
//   try {
//     const { event_id, customer_name, contact, event_date, guests,notes, email, emailOtp } = req.body;
// if (!event_id || !customer_name || !contact || !event_date || !guests || !email || !emailOtp) {
//   return res.status(400).json({ message: "Missing required booking fields" });
// }
//     // Validate OTP
//     const [otpRows] = await db.query(
//       "SELECT * FROM otp_codes WHERE email=? AND email_otp=? AND expires_at > NOW()",
//       [email, emailOtp]
//     );

//     if (!otpRows.length) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     // Save booking
//     await db.query(
//       "INSERT INTO bookings (event_id, customer_name, contact, event_date, guests, SetNotes, user_email) VALUES (?, ?, ?, ?, ?, ?, ?)",
//       [event_id, customer_name, contact, event_date, guests, notes, email]
//     );

   
//     await db.query("DELETE FROM otp_codes WHERE email=?", [email]);

//     res.json({ message: "Booking confirmed!" });
//   } catch (err) {
//     console.error("BOOKING ERROR:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../Config/Db");

router.post("/", async (req, res) => {
  try {
    const { event_id, customer_name, contact, event_date, guests, notes, user_email } = req.body;

    // Check required fields
    if (!event_id || !customer_name || !contact || !event_date || !guests || !user_email ) {
      return res.status(400).json({ message: "Missing required booking fields" });
    }

    // Save booking
  await db.query(
  `INSERT INTO bookings 
   (event_id, customer_name, contact, event_date, guests, SetNotes, user_email) 
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [event_id, customer_name, contact, event_date, guests, notes, user_email]
);

    res.json({ message: "Booking confirmed!" });
  } catch (err) {
    console.error("BOOKING ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;