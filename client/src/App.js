import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';


function App() {
  return (
    <div>
      <Navbar bg="dark" variant='dark'>
        <Container>
          <Navbar.Brand href="/">
            InterestHub
          </Navbar.Brand>
          <Nav>
            <Nav.Item>
              <Nav.Link href="/login">Войти</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/register">Создать аккаунт</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Switch>
          <Route path='/login'>
            <LoginPage/>
          </Route>
          <Route path='/'>
            <MainPage/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
