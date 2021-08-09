import React, { useEffect } from 'react';
import {Navbar, Container, Nav, Dropdown} from 'react-bootstrap';

function NavItems({isLoggedIn}){
  const [pfp, setPfp] = React.useState(null);
  useEffect(()=>{
    if (isLoggedIn){
      fetch('/profilepicture')
        .then(response=>response.blob())
        .then(image=>setPfp(URL.createObjectURL(image)));
    }
  }, [isLoggedIn]);
  if (isLoggedIn){
    return(
      <Nav>
        <Nav.Item>
          <Nav.Link href='/hub'>Хаб</Nav.Link>
        </Nav.Item>
        <Dropdown>
          <Dropdown.Toggle variant='dark'>
            <img style={{height: '30px', width: '30px'}} src={pfp} alt="" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/profile">Профиль</Dropdown.Item>
            <Dropdown.Item href="#">ЛС</Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item onClick={()=> fetch('/logout')} href="/">Выйти</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Nav.Item>
        </Nav.Item>
      </Nav>
    );
  }
  else{
    return(
      <Nav>
        <Nav.Item>
          <Nav.Link href="/login">Войти</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/register">Создать аккаунт</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}

export default function Header(){
    let [state, setState] = React.useState(false);
    useEffect(()=>{
      fetch('/isLoggedIn')
        .then(res=>res.json())
        .then(data=>{ 
          setState(data);
        });
    }, []);
    return(
        <Navbar bg="dark" variant='dark'>
        <Container>
          <Navbar.Brand href="/">
            InterestHub
          </Navbar.Brand>
          <NavItems isLoggedIn={state}/>
        </Container>
      </Navbar>
    );
}