import express from 'express';
const router = express.Router();
import { MongoClient, ObjectId } from 'mongodb';
// ... (Potentially connect to your MongoDB database here)

router.post('/', async (req, res) => {
    const { studyHours, studyDays, gradeWeight, importance } = req.body;

    // Data Validation (add robust validation for production)
    if (!studyHours || !studyDays || !gradeWeight || !importance) {
        return res.status(400).send("All fields are required"); 
    }
    if(studyHours<1||studyDays<1||gradeWeight<1){
        return res.status(400).send("All fields need to be greater than 0"); 
    }
    console.log(req.body);
});

export default router;