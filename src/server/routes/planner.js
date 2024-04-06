import express from 'express';
const router = express.Router();

// ... (Potentially connect to your MongoDB database here)

router.post('/submit', async (req, res) => {
    const { studyHours, studyDays, gradeWeight, importance } = req.body;

    // Data Validation (add robust validation for production)
    if (!studyHours || !studyDays || !gradeWeight || !importance) {
        return res.status(400).send("All fields are required"); 
    }

  

    // Example - Assuming temporary storage in a simple array (not persistent)
    let studyPlans = req.session.studyPlans || [] 
    studyPlans.push({ studyHours, studyDays, gradeWeight, importance });
    req.session.studyPlans = studyPlans; // Update session data

    res.status(200).send("Study plan submitted successfully!");
});

export default router;
