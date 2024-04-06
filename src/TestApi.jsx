import React from "react";
import axios from "axios";
import fakeFormData from "./data/Fake_Form_Data.json";

// Get this from frontend Form Data
// [
// {
//  estimated_hours: int
//  Days Available: comma separated string of days available to study for the particular subject in the MM DD, YYYY format
//  maybe a importance scale(1-5)int value this can be randomised just for us??:
//  Notes: string
// }
// ]
function TestApi() {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/gpt", {
        params: fakeFormData,
      });

      // Handle the response data here
      console.log(response);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
    }
  };

  return <button onClick={fetchData}>Fetch Schedule</button>;
}

export default TestApi;
