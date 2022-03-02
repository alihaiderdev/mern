import { sawal } from '../utils';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import UserModel from '../components/UserModel';

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const UsersScreen = () => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);

  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const { firstName, lastName, email, password } = signupForm;

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/users`);
      setUsers(data.data.users);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(`Error: ${e.message}`);
    }
  };

  useEffect(() => {
    getUsers();
    // return () => {
    //   cleanups;
    // };
  }, []);

  // console.log(users);

  const closeModel = () => setShow(false);
  const openModel = () => setShow(true);

  const onChangeHandler = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  async function signup(e) {
    e.preventDefault();
    try {
      if (
        firstName !== '' &&
        lastName !== '' &&
        email !== '' &&
        password !== ''
      ) {
        setIsLoadingSpinner(true);
        const { data } = await axios({
          method: 'POST',
          url: '/users',
          data: { firstName, lastName, email, password },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setUsers([...users, data.data]);
        sawal({
          icon: `success`,
          title: `Signup`,
          text: `User successfully created with this email ${email}`,
        });
        setIsLoadingSpinner(false);
        setSignupForm({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        });
        closeModel();
      } else {
        sawal({
          icon: `error`,
          title: `Error`,
          text: `Please fill out all fields before click on signup button`,
        });
      }
    } catch (e) {
      sawal({ icon: `error`, title: `Error`, text: e.message });
      setIsLoadingSpinner(false);
      console.log(`Error: ${e.message}`);
    }
  }

  async function updateUser(userId) {
    try {
      setIsLoading(true);
      const { data } = await axios({
        method: 'PATCH',
        url: `/users/${userId}`,
        data: { firstName, lastName, email, password },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (data.status === 'success') {
        sawal({
          icon: `success`,
          title: `Update`,
          text: `User updated with this id: ${userId}`,
        });
      }
      setUsers(data.data.users);
      setIsLoading(false);
      getUsers();
    } catch (e) {
      setIsLoading(false);
      sawal({
        icon: `error`,
        title: `Error`,
        text: e.message,
      });
      console.log(`Error: ${e.message}`);
    }
  }

  async function removeUser(userId) {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(`/users/${userId}`);
      setIsLoading(false);
      if (data.status === 'success') {
        sawal({
          icon: `success`,
          title: `Delete`,
          text: data.data.msg,
        });
      }
      getUsers();
    } catch (e) {
      setIsLoading(false);
      sawal({
        icon: `error`,
        title: `Error`,
        text: `Please fill out all fields before click on signup button`,
      });
      console.log(`Error: ${e.message}`);
    }
  }

  return (
    <div className='usersScreen py-3 w-100 h-100'>
      <div className='d-flex align-items-center justify-content-between'>
        <h1>Users</h1>
        <Button
          variant='primary'
          onClick={() => {
            openModel();
            setUser({});
          }}
        >
          Create User
        </Button>
      </div>

      {isLoading ? (
        <div className='loaderWrapper'>
          <Spinner animation='border' variant='primary' size='lg' />
        </div>
      ) : (
        <Row className='pt-4'>
          {users.length > 0 &&
            users.map((user, index) => {
              return (
                <Col
                  key={user._id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className='mb-4'
                >
                  <Card style={{ width: '100%' }}>
                    {/* <Card.Img
                      variant='top'
                      src={`https://picsum.photos/id/${getRandomNumberBetween(
                        0,
                        1000
                      )}/200/150`}
                      alt=''
                    /> */}
                    <Card.Body>
                      <ul className='m-0 p-0' style={{ listStyle: 'none' }}>
                        <li>
                          <strong>Index:</strong> {index + 1}
                        </li>
                        <li>
                          <strong>Id:</strong> {user._id}
                        </li>
                        <li>
                          <strong>First Name:</strong> {user.firstName}
                        </li>
                        <li>
                          <strong>Last Name:</strong> {user.lastName}
                        </li>
                        <li>
                          <strong>Email:</strong> {user.email}
                        </li>
                        <li>
                          <strong>Password:</strong> {user.password}
                        </li>
                      </ul>
                    </Card.Body>
                    <Card.Footer className='d-flex justify-content-between'>
                      <Button
                        size='sm'
                        variant='warning'
                        onClick={() => {
                          openModel();
                          setUser(user);
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        size='sm'
                        variant='danger'
                        onClick={() => {
                          removeUser(user._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
        </Row>
      )}
      <UserModel
        user={user}
        show={show}
        openModel={openModel}
        closeModel={closeModel}
        onChangeHandler={onChangeHandler}
        signup={signup}
        updateUser={updateUser}
        isLoading={isLoading}
        signupForm={signupForm}
      />
    </div>
  );
};

export default UsersScreen;
