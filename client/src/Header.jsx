import React, { useEffect } from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';


export default function Header(){
    const [state, setState] = React.useState(false);
    useEffect(()=>{
      fetch('/isLoggedIn')
        .then(res=>res.json())
        .then(data=>{ 
          setState(data);
        });
    });
    return(
        <Navbar bg="dark" variant='dark'>
        <Container>
          <Navbar.Brand href="/">
            InterestHub
          </Navbar.Brand>
          <Nav>
            <Nav.Item>
              <Nav.Link className={state?'d-none':''} href="/login">Войти</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={state?'d-none':''} href="/register">Создать аккаунт</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={!state?'d-none':''} onClick={()=> fetch('/logout')} href="/">Выйти</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    );
}