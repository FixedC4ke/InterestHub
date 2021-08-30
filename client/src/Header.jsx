import React, { useEffect } from 'react';
import {Navbar, Container, Nav, Dropdown, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavItems({isLoggedIn, updateState}){
  const [pfp, setPfp] = React.useState(null);
  useEffect(()=>{
    if (isLoggedIn){
      fetch('/profilepicture')
        .then(response=>response.blob())
        .then(image=>setPfp(URL.createObjectURL(image)));
    }
  }, [isLoggedIn]);
  if (isLoggedIn){
    if (!pfp) return null;
    return(
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} to='/communities'>Сообщества</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/hub'>Хаб</Nav.Link>
        </Nav.Item>
        <Dropdown>
          <Dropdown.Toggle variant='dark' style={{height: '100%'}}>
            <Image src={pfp} rounded style={{height: '100%'}}/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/profile">Профиль</Dropdown.Item>
            <Dropdown.Item as={Link} to="#">ЛС</Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item as={Link} onClick={()=> { 
                fetch('/logout') 
                  .then(()=>updateState())
              }
            } to="/">Выйти</Dropdown.Item>
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
          <Nav.Link as={Link} to='/login'>Войти</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/register">Создать аккаунт</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}

export default function Header({isLoggedIn, updateState}){
    return(
        <Navbar bg="dark" variant='dark'>
          <Container>
            <Navbar.Brand as={Link} to='/'>
              InterestHub
            </Navbar.Brand>
            <NavItems isLoggedIn={isLoggedIn} updateState={updateState}/>
          </Container>
      </Navbar>
    );
}