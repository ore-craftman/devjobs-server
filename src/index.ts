import express, { Express, Request, Response } from "express";
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const dbURI = process.env.MONGODB_URI;
const baseUrl = process.env.BASE_URL;

// Cors Handler
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Handler
const userRoutes = require("./routes/user");
app.use(`/${baseUrl}/users`, userRoutes);

// Server && DB Handler
try {
  if (process.env.NODE_ENV !== "test")
    app.listen(port, (): void => {
      console.log(`⚡️[server]: Live @ https://localhost:${port}`);

      mongoose.set("bufferCommands", true);

      if (process.env.NODE_ENV !== "test") {
        mongoose.connect(dbURI, (err: any) => {
          if (err) {
            console.log("DB Connection Err", err);
          }
          console.log(`⚡️[Datase]: Connected`);
        });
      }
    });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}

module.exports = app;
