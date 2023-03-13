import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Container,Navbar, Nav, Button, Table } from 'react-bootstrap';
import StudentDetails from './view/StudentDetails';
import AddStudent from "./view/AddStudent";
import DeleteConfirm from "./view/DeleteConfirm";
import UpdateStudent from "./view/UpdateStudent";
import axios from "axios";

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">STUDENT INFORMATION</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<AppList />} />
          <Route path="/information/:id" element={<StudentDetails />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/delete/:id" element={<DeleteConfirm />} />
          <Route path="/update/:id" element={<UpdateStudent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function AppList() {
  const [students, setStudents] = React.useState([]);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3001/students`);
      console.log('Students:', students);
      setStudents(res.data);
      
    };
    fetchData();
  }, [students]);


  return (
    <div className="AppList">
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ marginRight: "1rem" }}>Search</h1>
        <input type="text" placeholder="Search Here..." onChange={(e) => setQuery(e.target.value)}></input>
      </div>
      <div></div>
      <div>
        <h1>Student List</h1>
        <Button as={Link} to="/add" variant="success">Add Student</Button>
      </div>
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
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.filter((value) => {
            if (query === "") {
              return true;
            } else if (
              value.firstName.toLowerCase().includes(query.toLowerCase()) ||
              value.lastName.toLowerCase().includes(query.toLowerCase()) ||
              value.studentNumber.toString().includes(query.toLowerCase()) ||
              value.email.toLowerCase().includes(query.toLowerCase())||
              value.program.toLowerCase().includes(query.toLowerCase())||
              value.city.toLowerCase().includes(query.toLowerCase())||
              value.phoneNumber.toString().includes(query.toLowerCase())
            ) {
              return true;
            }
            return false;
          })
          .map(student => (
            <tr>
               
              <td key={student._id} onClick={() => navigate(`/information/${student._id}`)} style={{ cursor: 'pointer' }}>{student.studentNumber}</td>
              <td >{student.firstName}</td>
              <td >{student.lastName}</td>
              <td >{student.address}</td>
              <td >{student.city}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.email}</td>
              <td>{student.program}</td>
              <td>
                <Button onClick={() => {
                  if (window.confirm('You are about to delete a student record. Are you sure?')) {
                    fetch(`http://localhost:3001/delete/${student._id}`, {
                      method: 'POST'
                    })
                      .then(response => {
                        if (response.ok) {
                          const updatedStudents = students.filter(s => s._id !== student._id);
                          setStudents(updatedStudents);
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
              </td>


              <td><Button onClick={() => navigate(`/update/${student._id}`)} variant="primary">Update</Button></td>
            </tr>
          ))}
             
        </tbody>
      </Table>
    </div>
  );
}

export default App;
