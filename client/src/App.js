import { useState } from 'react';
import { Button, Form, Container, Spinner } from 'react-bootstrap';
import './app.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const sawal = ({ icon, title, text }) => {
  return Swal.fire({
    position: 'top-center',
    icon: icon,
    title: title,
    text: text,
    timer: 5000,
    showClass: {
      popup: 'animate__animated animate__fadeInDown',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
  });
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const { firstName, lastName, email, password } = signupForm;

  const onChangeHandler = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

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
          url: 'http://localhost:8080/api/users',
          data: { firstName, lastName, email, password },
        });
        sawal({
          icon: `success`,
          title: `Signup`,
          text: `User successfully created with this email ${email}`,
        });
        setIsLoading(false);
        console.log(res.data);
      } else {
        sawal({
          icon: `error`,
          title: `Error`,
          text: `Please fill out all fields before click on signup button`,
        });
      }
    } catch (e) {
      sawal({ icon: `error`, title: `Error`, text: e.message });
      setIsLoading(false);
      console.log(`Error: ${e.message}`);
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
              onChange={onChangeHandler}
              placeholder='Enter your first name'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='lastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              name='lastName'
              value={lastName}
              onChange={onChangeHandler}
              placeholder='Enter your last name'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              value={email}
              onChange={onChangeHandler}
              placeholder='Enter your email'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              value={password}
              onChange={onChangeHandler}
              placeholder='Enter your password'
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            {isLoading && (
              <>
                <Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                  className='me-3'
                />
                <span className='visually-hidden'>Loading...</span>
              </>
            )}
            Signup
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default App;
