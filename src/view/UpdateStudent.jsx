import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';

function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [validated, setValidated] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [programError, setProgramError] = useState(false);


  useEffect(() => {
    fetch(`http://localhost:3001/information/${id}`)
      .then(response => response.json())
      .then(data => setFormData(data))
      .catch(error => console.log(error));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'program') {
      setFormData(prevFormData => ({
        ...prevFormData,
        program: value
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };
  
  const validateEmail = (email) => {
    // Regular expression to validate email format
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
   // Regular expression to validate 10-digit phone number
  const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  const validateProgram = (program) => {
    return program !== "";
  }
  

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      email: email
    }));
    setEmailError(!validateEmail(email));
  };
  
  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      phoneNumber: phone
    }));
    setPhoneError(!validatePhone(phone));
  };

  const handleProgramChange = (e) => {
    const program = e.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      program: program
    }));
    setProgramError(!validateProgram(program));
  };
  
  

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (!validateEmail(formData.email)) {
      setEmailError(true);
      return;
    }
    if (!validatePhone(formData.phoneNumber)) {
      setPhoneError(true);
      return;
    }
    if (programError) {
      return;
    }
    
    const student = {
      studentNumber: formData.studentNumber,
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      city: formData.city,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      program: formData.program
    };
    
    fetch(`http://localhost:3001/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    })
    .then(response => response.json())
    .then(() => navigate('/'))
    .catch(error => {
      console.log(error);
    });
  }
  

  return (
    <Container>
      <h1>Update Student</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
          <Form.Group as={Col} md="4" controlId="studentNumber">
            <Form.Label>Student Number</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Enter student number"
              name="studentNumber"
              value={formData.studentNumber || ''}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Student Number.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="4" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid first name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="4" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid last name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
    <Row>
       <Form.Group as={Col} md="4" controlId="address">
         <Form.Label>Address</Form.Label>
         <Form.Control
           required
           type="text"
           name="address"
           placeholder="Enter address"
           value={formData.address || ''}
          onChange={handleInputChange}
         />
         <Form.Control.Feedback type="invalid">
           Please provide a valid address.
         </Form.Control.Feedback>
       </Form.Group>
     </Row>
     <Row>
       <Form.Group as={Col} md="4" controlId="city">
         <Form.Label>City</Form.Label>
         <Form.Control
           required
           type="text"
           name="city"
           placeholder="Enter city"
           value={formData.city || ''}
          onChange={handleInputChange}
         />
         <Form.Control.Feedback type="invalid">
           Please provide a valid city.
         </Form.Control.Feedback>
       </Form.Group>
     </Row>
    <Row>
      <Form.Group as={Col} md="4" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email || ''}
          onChange={handleEmailChange}
        />
           {emailError && <Alert variant="danger">Email is invalid!</Alert>}  

        </Form.Group>
    </Row>
    <Row>
       <Form.Group as={Col} md="4" controlId="phoneNumber">
         <Form.Label>Phone Number</Form.Label>
         <Form.Control
           required
           type="text"
           name="phoneNumber"
           placeholder="Enter phone number"
           value={formData.phoneNumber || ''}
          onChange={handlePhoneChange}
         />
        {phoneError && <Alert variant="danger">Phone must be 10-digit Canadian (XXXXXXXXXX) number</Alert>}

       </Form.Group>
     </Row>
    <Row>
    <Form.Group as={Col} md="4" controlId="program">
        <Form.Label>Program</Form.Label>
        <Form.Control name="program" as="select" value={formData.program || ''} onChange={handleProgramChange}>
          <option value="">-- Select program --</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Accounting">Accounting</option>
          <option value="Business Administration">Business Administration</option>
        </Form.Control>
        {programError && <Alert variant="danger">Please choose a program</Alert>}
      </Form.Group>


    </Row>
    <br></br>
   <span><Button type="submit">Submit</Button></span> <span><Button variant="secondary" onClick={() => navigate('/')}>Go Back</Button></span>
    
  </Form>
</Container>
);

} 
export default UpdateStudent;