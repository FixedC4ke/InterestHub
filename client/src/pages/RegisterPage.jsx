import React from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export default function RegisterPage(){
    const [state, setState] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState('');
    function submitHandler(e){
        e.preventDefault();
        let data = new FormData(e.target);

        fetch('/register', {
            method: 'post',
            body: data
        })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                setState(data.success);
                setErrorMsg(data.message);
            });
    }
    if (state) { return <Redirect to='/'/> }
    return (
        <div>
            <Container>
                <Card style={{margin: '20px 10%'}}>
                    <Card.Header as="h5">Регистрация</Card.Header>
                    <Card.Body>
                        <Form onSubmit={submitHandler} encType="multipart/form-data">
                            <Alert variant='danger' show={errorMsg.length>0}>{errorMsg}</Alert>
                            <Form.Group className="mb-3">
                                <Form.Label>Имя пользователя</Form.Label>
                                <Form.Control required name="username" type="text" placeholder="Введите имя пользователя"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control name="password" type="password" placeholder="Введите пароль"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Подтверждение пароля</Form.Label>
                                <Form.Control name="confirmpass" type="password" placeholder="Введите пароль еще раз"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Электронная почта</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Введите электронную почту"/>
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Загрузите аватарку</Form.Label>
                                <Form.Control name="avatar" type="file"/>
                            </Form.Group>
                            <Button style={{marginRight: '10px'}} variant="primary" type="submit">Зарегистрироваться</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}