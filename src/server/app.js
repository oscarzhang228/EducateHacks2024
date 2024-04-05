import express from "express";
import LMS_Data from "../data/LMS_Data.json" assert { type: "json" };

// Example Data from LMS
// {
// 	assignment_name: string representing name of assignment
// 	class: string representing what class this is
// 	due_date: Date in MM Day, YEAR HR:MIN:SEC
// }
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Get this from frontend Form Data
// {
// 	estimated_hours? ( maybe GPT can do this)
//             Days Available (Days available to study for the particular subject?)
// maybe a importance scale(1-5)int value this can be randomised just for us??:
// Notes String():

// }

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
