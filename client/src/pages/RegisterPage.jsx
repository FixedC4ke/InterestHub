import React from 'react';
import {Container, Form, Button, Card} from 'react-bootstrap';

export default function RegisterPage(){
    return (
        <div>
            <Container>
                <Card style={{margin: '20px 10%'}}>
                    <Card.Header as="h5">Регистрация</Card.Header>
                    <Card.Body>
                        <Form method="POST" action="/register" encType="multipart/form-data">
                            <Form.Group className="mb-3">
                                <Form.Label>Имя пользователя</Form.Label>
                                <Form.Control name="username" type="text" placeholder="Введите имя пользователя"/>
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