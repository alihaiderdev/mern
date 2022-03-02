import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UsersScreen from './screens/UsersScreen';
import { Container } from 'react-bootstrap';

const App = () => {
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
