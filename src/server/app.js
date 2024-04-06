import express from "express";
import cors from "cors";

import login from "./routes/login.js";
import gpt from "./routes/gpt.js";

const app = express();

app.use(cors());

app.use("/login", login);
app.use("/gpt", gpt);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
