// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./Config/Db"); // your mysql2 pool
const initDb = require("./Config/initDb");
const eventroute = require("./Routes/EventsRoute");
const Booking = require("./Routes/BookingRoute");
const Members = require("./Routes/MemberRoute");
const adminroutes = require("./Adminlogin/adminroutes");
const adminActions = require("./Routes/AdminRoute");
const Otps = require("./OTP/otp");
const rates = require("./Routes/rating.js");
const path = require("path");

const app = express();

// ✅ Parse JSON & URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS setup (allow your frontend URLs)
app.use(cors({
  origin: [
    "http://localhost:5173",
   
  ],
   methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Serve static images
app.use("/images", express.static(path.join(__dirname, "Images")));


app.locals.db = db;

// ✅ API routes
app.use("/api/admin", adminroutes);
app.use("/api/events", eventroute);
app.use("/api/bookings", Booking);
app.use("/api/members", Members);
app.use("/api/otp", Otps);
app.use("/api/rating/manage", rates);
app.use("/api/admin", adminActions);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Catering API Running...");
});

// ✅ Start server
const PORT = process.env.PORT || 3000; // Render automatically provides PORT
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});