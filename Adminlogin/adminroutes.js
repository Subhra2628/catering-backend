
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../Config/Db");

router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM super_admin WHERE name = ? AND password = ?", [name, password]);

    if (rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const admin = rows[0];

    // Generate token with admin role
    const SECRET = process.env.JWT_SECRET;
    const token = jwt.sign(
      { id: admin.id, name: admin.name, role: "admin" },
      SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token, name: admin.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;