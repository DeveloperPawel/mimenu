import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
import csrf from "csurf";
import cookieParser from "cookie-parser";
const morgan = require("morgan");
require("dotenv").config();

// const csrfProtection = csrf({ cookie: true });

//create express app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    userNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// apply middlewares
app.use(cors());
app.use(express.json());
// app.use(cookieParser());
app.use(morgan("dev"));
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
// app.use((req, res, next) => {
//   console.log("this is my own middleware");
//   next();
// });

//route
readdirSync("./routes").map((path) =>
  app.use("/api", require(`./routes/${path}`))
);
// app.use(csrfProtection);

// app.get("/api/csrf-token", (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });

// app.get("/", (req, res) => {
//   res.send("you hit server endpoint");
// });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
