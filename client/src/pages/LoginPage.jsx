import React from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export default function LoginPage(props){
    const [errorMessage, setErrorMessage] = React.useState('');
    const [state, setState] = React.useState(false);
    function submitHandle(e){
        e.preventDefault();
        let data = new FormData(e.target);

        fetch('/login', { 
            method: 'post',
            body: data
        })
            .then(res=>res.json())
            .then(res=>{
                setErrorMessage(res.message);
                setState(res.success);
                if (res.success){
                    props.updateState();
                }
            });
    }
    if (state) { return <Redirect to='/'/> }
    return (
        <div>
            <Container>
                <Card style={{margin: '20px 10%'}}>
                    <Card.Header as="h5">Авторизация</Card.Header>
                    <Card.Body>
                        <Form onSubmit={submitHandle}>
                            <Form.Group className="mb-3">
                                <Form.Label>Имя пользователя</Form.Label>
                                <Form.Control id="username" name="username" type="text" placeholder="Введите имя пользователя"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control id="password" name="password" type="password" placeholder="Введите пароль"/>
                            </Form.Group>
                            <Alert variant='danger' show={errorMessage.length>0}>{errorMessage}</Alert>
                            <Button style={{marginRight: '10px'}} variant="primary" type="submit">Войти</Button>
                            <a href="/restoreAccess">Забыли пароль?</a>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}