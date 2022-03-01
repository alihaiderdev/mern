import { useState } from 'react';
import { Button, Form, Container, Alert, Spinner } from 'react-bootstrap';
import './app.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const { firstName, lastName, email, password } = signupForm;

  const signup = async (e) => {
    e.preventDefault();
    try {
      if (
        firstName !== '' &&
        lastName !== '' &&
        email !== '' &&
        password !== ''
      ) {
        setIsLoading(true);
        const res = await axios({
          method: 'POST',
          url: 'http://localhost:8080/api/user',
          data: { firstName, lastName, email, password },
        });
        console.log(res.data);
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: `Signup`,
          text: `User successfully created with this email ${email}`,
          timer: 5000,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });

        setIsLoading(false);
      } else {
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: `Error`,
          text: `Please fill out all fields before click on signup button`,
          timer: 5000,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      }
    } catch (e) {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: `Error`,
        text: e.message,
        timer: 5000,
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      });

      console.log(`Error: ${e.message}`);
      setIsLoading(false);
    }
  };

  return (
    <Container className='appScreen py-5'>
      <h1 className='d-flex justify-content-center'>Signup Form</h1>
      {isLoading ? (
        <div className='loaderWrapper'>
          <Spinner animation='border' variant='primary' size='lg' />
        </div>
      ) : (
        <Form onSubmit={signup}>
          <Form.Group className='mb-3' controlId='firstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              name='firstName'
              value={firstName}
              onChange={(e) => {
                setSignupForm({ ...signupForm, firstName: e.target.value });
              }}
              placeholder='Enter your first name'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='lastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              name='lastName'
              value={lastName}
              onChange={(e) => {
                setSignupForm({ ...signupForm, lastName: e.target.value });
              }}
              placeholder='Enter your last name'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              value={email}
              onChange={(e) => {
                setSignupForm({ ...signupForm, email: e.target.value });
              }}
              placeholder='Enter your email'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              value={password}
              onChange={(e) => {
                setSignupForm({ ...signupForm, password: e.target.value });
              }}
              placeholder='Enter your password'
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Signup
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default App;
