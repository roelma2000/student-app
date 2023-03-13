import {React, useEffect} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = React.useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/information/${id}`)
      .then(response => response.json())
      .then(data => setStudent(data))
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  return (
    <Container>
      <h1>Student Details</h1>
      <Row>
        <Col>
          <p><strong>Student Number:</strong> {student.studentNumber}</p>
          <p><strong>First Name:</strong> {student.firstName}</p>
          <p><strong>Last Name:</strong> {student.lastName}</p>
          <p><strong>Address:</strong> {student.address}</p>
          <p><strong>City:</strong> {student.city}</p>
          <p><strong>Phone Number:</strong> {student.phoneNumber}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Program:</strong> {student.program}</p>
        </Col>
      </Row>
      <Row>
        <Col>
        <Button onClick={() => {
                  if (window.confirm('You are about to delete a student record. Are you sure?')) {
                    fetch(`http://localhost:3001/delete/${student._id}`, {
                      method: 'POST'
                    })
                      .then(response => {
                        if (response.ok) {
                          navigate('/');
                        } else {
                          throw new Error('Failed to delete student record');
                        }
                      })
                      .catch(error => {
                        console.log(error);
                      });
                  }
                }} variant="danger">
                  Delete
                </Button>
        </Col>
        <Col>
          
          <Button onClick={() => navigate(`/update/${student._id}`)} variant="primary">Update</Button>
          
        </Col>
        <Col>
          <Link to="/">
            <Button variant="secondary">Go Back</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default StudentDetails;
