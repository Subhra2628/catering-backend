const express = require("express");
const router = express.Router();
const db = require("../Config/Db");

console.log("🔥 CounterRoute loaded");

// ✅ CHANGE THIS
router.get("/count", async (req, res) => {
  console.log("🔥 Count API HIT");

  try {
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM bookings");

    res.json({
      success: true,
      count: rows[0].total,
    });

  } catch (err) {
    console.error("❌ Booking count error:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;