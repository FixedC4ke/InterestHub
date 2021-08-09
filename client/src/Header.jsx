import React, { useEffect } from 'react';
import {Navbar, Container, Nav, Dropdown} from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import pfp from './kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66e306b15.0756271715374598221983.png';

function NavItems({isLoggedIn}){
  if (isLoggedIn){
    return(
      <Nav>
        <Nav.Item>
          <Nav.Link href='/hub'>Хаб</Nav.Link>
        </Nav.Item>
        <Dropdown>
          <Dropdown.Toggle variant='dark'>
            <img style={{width: '30px', height: '30px'}} src={pfp} alt="" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/profile">Профиль</Dropdown.Item>
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