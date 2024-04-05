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
  console.log("Hello, World!");
});
app.post("/login", async (req, res) => {
  if (req.session.loggedin) {
    return res.sendStatus(400);
  }

  let user = req.body.username;
  let pass = req.body.password;
  let userInfoCollection = db.collection("UserInfo");
  let userFound = await userInfoCollection.find({ username: user }).toArray();
  if (userFound.length != 0) {
    if (userFound[0].password == pass) {
      req.session.username = user; //we keep track of what user this session belongs to
      req.session.loggedin = true;

      if (userFound[0].patron === false) {
        return res.status(300).json({ user: user });
      }
      return res.status(200).json({ user: user });
    } else {
      return res.sendStatus(401);
    }
  } else {
    return res.status(201).json({ user: user });
  }
});

// import OpenAI from "openai";
// const openai = new OpenAI();

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{"role": "system", "content": "You are a helpful assistant."},
//         {"role": "user", "content": "Who won the world series in 2020?"},
//         {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
//         {"role": "user", "content": "Where was it played?"}],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
// }
// main();

// Get this from frontend Form Data
// {
//  estimated_hours? ( maybe GPT can do this)
//  Days Available (Days available to study for the particular subject?)
//  maybe a importance scale(1-5)int value this can be randomised just for us??:
//  Notes String():
// }

const GPT_PROMPT = () => {
  return;
  ("You are a professional school planner specialized in creating study schedules for students. You have been asked to create a study schedule for a student who has upcoming exams and assignments. You'll have access to the name of the assignment, the class, and the due date for each assignment or exam. You'll also have access to the estimated hours needed to study for each assignment, the number of days available to study for each subject, and a scale of importance for each assignment. You'll need to create a study schedule that maximizes the student's study time and helps them prepare for their exams and assignments. Please write data back that is in the form of a JSON object. The JSON Object should look like this: {assignment_name: string, class: string, due_date: string, study_schedule: string}. The study_schedule should include the days and hours the student should study for each assignment or exam.");
};
app.get("/schedule", (req, res) => {
  const formData = req.body;

  // Process the form data here

  res.send("Form data received successfully");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
