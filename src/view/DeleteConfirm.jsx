import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form ,Table} from 'react-bootstrap';

function DeleteConfirm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/information/${id}`)
      .then(response => response.json())
      .then(data => setStudent(data))
      .catch(error => console.log(error));
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:3001/delete/${id}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(() => navigate('/'))
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <Container>
      <h1>Delete Record</h1>
      <Form>
        <Row>
           <Form.Group as={Col} md="4" controlId="delete">
             <Form.Label>Are you sure you want to delete this record?</Form.Label>
             {student ? (
               <Table hover>
                 <thead>
                   <tr>
                     <th>ID</th>
                     <th>First Name</th>
                     <th>Last Name</th>
                     <th>Address</th>
                     <th>City</th>
                     <th>Phone Number</th>
                     <th>Email</th>
                     <th>Program</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>{student.studentNumber}</td>
                     <td>{student.firstName}</td>
                     <td>{student.lastName}</td>
                     <td>{student.address}</td>
                     <td>{student.city}</td>
                     <td>{student.phoneNumber}</td>
                     <td>{student.email}</td>
                     <td>{student.program}</td>
                   </tr>
                 </tbody>
               </Table>
             ) : (
               <p>Loading...</p>
             )}
           </Form.Group>
         </Row>
        <Row>
           <Form.Group as={Col} md="4" controlId="delete">
             <Button variant="danger" onClick={handleDelete}>Yes</Button>{' '}
             <Button variant="secondary" onClick={() => navigate('/')}>No</Button>
           </Form.Group>
         </Row>
      </Form>
    </Container>
  );
} 

export default DeleteConfirm;
