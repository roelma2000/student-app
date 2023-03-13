import {React,useState} from 'react';
import {  useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Alert} from 'react-bootstrap';

function AddStudent() {
  const navigate = useNavigate();
  const [studentNumber, setStudentNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("");
  const [validated, setValidated] = useState(false);
  const [studentNumberError, setStudentNumberError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneNumberError] = useState(false);
  const [programError, setProgramError] = useState(false);


  const validateStudentNumber = (value) => {
    if (!/^\d+$/.test(value)) {
      setStudentNumberError("Please enter a valid student number (numeric only).");
      return false;
    } else {
      setStudentNumberError("");
      return true;
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
     if (program !== "") return true;
  }
  

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setEmailError(!validateEmail(email));
  };
  
  
  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    setPhoneNumber(phone);
    setPhoneNumberError(!validatePhone(phone));
  };
  
  const handleProgramChange = (e) => {
    const program = e.target.value;
    setProgram(program);
    setProgramError(!validateProgram(program));
  };
  
 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'studentNumber':
        // Accepts only numeric value
        if (validateStudentNumber(value)) {
          setStudentNumber(value);
        }
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'phoneNumber':
          // Validates Canadian phone number format
          if (validatePhone(value)) {
            setPhoneNumber(value);
          }
        break;
      case 'email':
        // Validates email format
        if (validateEmail(value)) {
          setEmail(value);
        }
        break;
      case 'program':
            setProgram(value);
        break;
      default:
        break;
    }
  };
  

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    if (!validatePhone(phoneNumber)) {
      setPhoneNumberError(true);
      return;
    }
    if (!validateProgram(program)) {
      setProgramError(true);
      return;
    }
    if (form.checkValidity() === true && !emailError && !phoneError && !programError) {
      const student = {
        studentNumber,
        firstName,
        lastName,
        address,
        city,
        phoneNumber,
        email,
        program
      };
      fetch('http://localhost:3001/create', {
        method: 'POST',
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
  }


  return (
    <Container>
      <h1>Add Student</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} md="4" controlId="studentNumber">
            <Form.Label>Student Number</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Enter student number"
              value={studentNumber}
              onChange={(e) => {setStudentNumber(e.target.value); handleInputChange(e)}} 
            />
              {studentNumberError && <Alert variant="danger">{studentNumberError}</Alert>}
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
               value={firstName}
               onChange={(e) => {setFirstName(e.target.value); handleInputChange(e)}}
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
              value={lastName}
              onChange={(e) => {setLastName(e.target.value); handleInputChange(e)}}
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
               placeholder="Enter address"
               value={address}
               onChange={(e) => {setAddress(e.target.value); handleInputChange(e)}}
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
               placeholder="Enter city"
               value={city}
               onChange={(e) => {setCity(e.target.value); handleInputChange(e)}}
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
              placeholder="Enter email"
              value={email}
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
               placeholder="Enter phone number"
               value={phoneNumber}
               onChange={handlePhoneChange}
             />
            
            {phoneError && <Alert variant="danger">Phone must be 10-digit Canadian (XXXXXXXXXX) number</Alert>}

           </Form.Group>
         </Row>
        <Row>
        <Form.Group as={Col} md="4" controlId="program">

          <Form.Label>Program</Form.Label>
          <Form.Control as="select" value={program} onChange={handleProgramChange}>
            <option value="">-- Select program --</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Accounting">Accounting</option>
            <option value="Business Administration">Business Administration</option>
          </Form.Control>
          {programError && <Alert variant="danger">Please choose a program</Alert>}
          
        </Form.Group>

        </Row>
        <br></br>
        <span><Button type="submit">Submit</Button></span>
        <span>&nbsp;</span><span><Link to="/">
            <Button variant="secondary">Go Back</Button>
          </Link></span>
   
      </Form>
    </Container>
  );
  
  
  } 

  export default AddStudent;