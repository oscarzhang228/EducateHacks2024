import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import TestApi from "./TestApi.jsx";
import PlannerForm from "./PlannerForm.jsx";

// Example Data from LMS
// {
// 	assignment_name: string representing name of assignment
// 	class: string representing what class this is
// 	due_date: Date in MM Day, YEAR HR:MIN:SEC
// }

// Get this from frontend Form Data
// {
//  estimated_hours? ( maybe GPT can do this)
//  Days Available (Days available to study for the particular subject?)
//  maybe a importance scale(1-5)int value this can be randomised just for us??:
//  Notes String():
//  time_range: Like 8am - 5pm studying time or something write it as a string
// }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path ="/planner" element = {<PlannerForm/>} />
        <Route path="/testing" element={<TestApi />} />
      </Routes>
    </Router>
  );
}

export default App;
