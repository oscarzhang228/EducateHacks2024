import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";

function PlannerForm() {
  const [studyHours, setStudyHours] = useState('');
  const [studyDays, setStudyDays] = useState('');
  const [gradeWeight, setGradeWeight] = useState('');
  const [importance, setImportance] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/loading');
    console.log('Form data:', { studyHours, studyDays, gradeWeight, importance });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="studyHours">
            <Form.Label>Hours Needed to Study</Form.Label>
            <Form.Control type="number" value={studyHours} onChange={(e) => setStudyHours(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="studyDays">
            <Form.Label>Days Available to Study</Form.Label>
            <Form.Control type="number" value={studyDays} onChange={(e) => setStudyDays(e.target.value)} required />
          </Form.Group>


          <Form.Group controlId="importance">
            <Form.Label>Importance for you to do it (scale from 1 to 5)</Form.Label>
            <Form.Control type="number" min="1" max="5" value={importance} onChange={(e) => setImportance(e.target.value)} required />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default PlannerForm;
