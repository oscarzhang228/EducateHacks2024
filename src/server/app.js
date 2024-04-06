import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from 'express-session';
import { MongoClient } from 'mongodb'; // Import express-session

import login from "./routes/login.js";
import gpt from "./routes/gpt.js";

const app = express();

app.use(session({
  secret: 'your-secure-secret-key', 
  resave: false,
  saveUninitialized: false,
 
}));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/login", login);
app.use("/gpt", gpt);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
