
// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const db = require("../Config/Db");
// const verifyAdmin = require("../Middleware/admin");
// router.post("/login", async (req, res) => {
//   const { name, password } = req.body;

//   try {
//     const [rows] = await db.query("SELECT * FROM super_admin WHERE name = ? AND password = ?", [name, password]);

//     if (rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });

//     const admin = rows[0];

//     // Generate token with admin role
//     const SECRET = process.env.JWT_SECRET;
//     const token = jwt.sign(
//       { id: admin.id, name: admin.name, role: "admin" },
//       SECRET,
//       { expiresIn: "2h" }
//     );

//     res.json({ token, name: admin.name });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });
// // UPDATE event (ADMIN)
// router.put("/events/:id", verifyAdmin, async (req, res) => {
//   const { name, price_per_head, description } = req.body;

//   try {
//     await db.query(
//       "UPDATE events SET name=?, price_per_head=?, description=? WHERE id=?",
//       [name, price_per_head, description, req.params.id]
//     );

//     res.json({ message: "Event updated" });
//   } catch (err) {
//     res.status(500).json({ message: "Update failed" });
//   }
// });

// // DELETE event (ADMIN)
// router.delete("/events/:id", verifyAdmin, async (req, res) => {
//   try {
//     await db.query("DELETE FROM events WHERE id=?", [req.params.id]);
//     res.json({ message: "Event deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Delete failed" });
//   }
// });
// module.exports = router;