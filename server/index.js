require("dotenv").config();
const express = require("express");
const caseRoutes = require("./routes/case");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

db.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Database connected successfully at:", res.rows[0].now);
  }
});

app.use("/case-status", caseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
