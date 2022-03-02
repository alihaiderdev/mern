import { Button, Form, Modal, Spinner } from 'react-bootstrap';

const UserModel = ({
  user,
  show,
  closeModel,
  onChangeHandler,
  signup,
  updateUser,
  isLoading,
  signupForm,
}) => {
  const { firstName, lastName, email, password } = signupForm;
  const userExist = Object.keys(user).length > 0;

  return (
    <Modal show={show} onHide={closeModel} centered>
      <Form onSubmit={userExist ? updateUser : signup}>
        <Modal.Header closeButton>
          <Modal.Title>{userExist ? `User ${user._id}` : 'User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3' controlId='firstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              name='firstName'
              value={userExist ? user.firstName : firstName}
              onChange={onChangeHandler}
              placeholder='Enter your first name'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='lastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              name='lastName'
              value={userExist ? user.lastName : lastName}
              onChange={onChangeHandler}
              placeholder='Enter your last name'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              value={userExist ? user.email : email}
              onChange={onChangeHandler}
              placeholder='Enter your email'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              value={userExist ? user.password : password}
              onChange={onChangeHandler}
              placeholder='Enter your password'
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={`${userExist ? 'warning' : 'primary'}`}
            type='submit'
          >
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
            {userExist ? 'Update' : 'Create'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UserModel;
