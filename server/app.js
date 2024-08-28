const express = require("express");
const app = express();
const cookie_parser = require("cookie-parser");
const cors = require("cors");
const os = require("os");
const path = require("path");

// Increase payload size limit (100MB in this example)
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

//using cookie parser
app.use(cookie_parser());

// cors factor
app.use(cors());

//static serve from "dist (frontend)"  in root
app.use(express.static("dist"));


// index route in server
app.get("/", (req, res) => {
  res.json({ "Ak backend server is up & running at": os.hostname() });
});

// require dotenv for environment variable
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/config.env" });
}

const admin = require("./routes/admin");
const student = require("./routes/student");

app.use("/api/v1", admin);
app.use("/api/v1", student);

// Set MIME type for JavaScript files
app.get("*.js", (req, res, next) => {
  res.type("application/javascript");
  next();
});

// Catch-all route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

module.exports = app;
