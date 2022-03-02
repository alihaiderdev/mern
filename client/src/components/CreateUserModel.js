import { Button, Form, Modal, Spinner } from 'react-bootstrap';

const CreateUserModel = ({
  show,
  closeModel,
  onChangeHandler,
  signup,
  isLoading,
  signupForm,
}) => {
  const { firstName, lastName, email, password } = signupForm;
  return (
    <Modal show={show} onHide={closeModel} centered>
      <Modal.Header closeButton>
        <Modal.Title>User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={closeModel}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUserModel;
