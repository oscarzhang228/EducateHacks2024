import express from "express";
import LMS_Data from "../../data/LMS_Data.json" assert { type: "json" };
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Example Data from LMS
// {
// 	assignment_name: string representing name of assignment
// 	class: string representing what class this is
// 	due_date: Date in MM Day, YEAR HR:MIN:SEC
// }
// import OpenAI from "openai";
// const openai = new OpenAI();

// async function main() {

//   console.log(completion.choices[0]);
// }
// main();

// return data from GPT. Array of objects where each object represents a day and the study schedule for that day
// [
//   {
//     day: "March 21 2022", // Date in MM Day, YEAR
//     study_schedule: [ // Array of objects where each object represents a study session
//       {
//         assignment_name: "Assignment 1",
//         class: "Math",
//         start_time: "8:00 AM",
//         end_time: "10:00 AM",
//       },
//       {
//         assignment_name: "Assignment 2",
//         class: "Science",
//         start_time: "10:00 AM",
//         end_time: "12:00 PM",
//       },
// ]]

// takes in am array of objects where each object represents an assignment or exam and returns a string prompt for GPT
const GPT_PROMPT = (assignments) => {
  return (
    "You are a professional school planner specialized in creating study schedules for students. You have been asked to create a study schedule for a student who has upcoming exams and assignments. You'll have access to the name of the assignment, the class, and the due date for each assignment or exam. You'll also have access to the estimated hours needed to study for each assignment, the number of days available to study for each subject, a scale of importance for each assignment (1-5) with 5 being the most important, and some notes on the assignment. You'll need to create a study schedule that maximizes the student's study time and helps them prepare for their exams and assignments. Please write data back that is in the form of a JSON object. The JSON object should look like this: [{ day: 'March 21 2022', study_schedule: [{ assignment_name: 'Assignment 1', class: 'Math', start_time: '8:00 AM', end_time: '10:00 AM' }, { assignment_name: 'Assignment 2', class: 'Science', start_time: '10:00 AM', end_time: '12:00 PM' }] }] which is an array of objects where each object represents a day and the study schedule for that day. Each study session should include the assignment name, the class, the start time, and the end time. Here is the data:" +
    JSON.stringify(assignments) +
    " Please create a study schedule for the student based on this data;"
  );
};

// Get this from frontend Form Data
// [
// {
//  estimated_hours: int
//  days_available: comma separated string of days available to study for the particular subject in the MM DD, YYYY format
//  importance_scale: (1-5)int value this can be randomised just for us??:
//  notes: string
// }
// ]
router.get("/", async (req, res) => {
  const formData = req.query;
  // Combine form data with LMS data
  const combinedData = LMS_Data.map((item, index) => ({
    ...item,
    ...formData[index],
  }));

  // Call GPT_PROMPT function with combined data
  const studySchedule = GPT_PROMPT(combinedData);

  //   const completion = await openai.chat.completions.create({
  //     messages: [{ role: "system", content: studySchedule }],
  //     model: "gpt-3.5-turbo",
  //   });

  // Send the study schedule as JSON response
  res.json(studySchedule);
});

// Export the router
export default router;
