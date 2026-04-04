// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./Config/Db");
const initDb = require("./Config/initDb");
const eventroute = require("./Routes/EventsRoute");
const Booking = require("./Routes/BookingRoute");
const Members = require("./Routes/MemberRoute");
const adminroutes = require("./Routes/AdminRoute");
// const adminActions = require("./Routes/AdminRoute");
const rates = require("./Routes/rating");
const path = require("path");
const Counterroute=require("./Routes/CounterRoute");
const app = express();

// ✅ CORS middleware must be BEFORE routes
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://deployment-catering-frontend-3e9bsci7s-subhradips-projects-f5cbf0de.vercel.app",
//     "https://domain-catering-frontend-eta.vercel.app"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   // remove credentials unless you really need cookies
// }));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Parse JSON & URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static images
app.use("/images", express.static(path.join(__dirname, "Images")));

app.locals.db = db;

// ✅ API routes
app.use("/api/admin", adminroutes);
app.use("/api/events", eventroute);
// app.use("/api/bookings/count",Counterroute);
// app.use("/api/bookings", Booking);
// app.use("/api/bookings", Counterroute); // for /count
app.use("/api/bookings", Booking);      // for other booking APIs
app.use("/api/members", Members);
app.use("/api/rating/manage", rates);
// app.use("/api/admin", adminActions);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Catering API Running...");
});

// ✅ Start server
const PORT = process.env.PORT || 3000;


async function startServer() {
  await initDb(); // ✅ now valid

  app.listen(process.env.PORT || 5000, () => {
    console.log("🚀 Server running...");
  });
}
startServer();