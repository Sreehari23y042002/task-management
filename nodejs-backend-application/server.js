require("dotenv").config();
const express = require("express");
const cors = require("cors");
const configDB = require("./config/db.config.js");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//DB connect
configDB();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
// require("./routes/auth.routes")(app);
// require("./routes/user.routes")(app);

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

// set port, listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});
