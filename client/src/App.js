import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UsersScreen from './screens/UsersScreen';
import { Container } from 'react-bootstrap';
import axios from 'axios';

const App = () => {
  axios.defaults.baseURL = `http://localhost:8080/api`;
  return (
    <Container className='appScreen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UsersScreen />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
