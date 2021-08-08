import React from 'react';
import {Container, Form, Button, Card} from 'react-bootstrap';

export default function LoginPage(){
    return (
        <div>
            <Container>
                <Card style={{margin: '20px 10%'}}>
                    <Card.Header as="h5">Регистрация</Card.Header>
                    <Card.Body>
                        <Form method="POST" action="/register">
                            <Form.Group className="mb-3">
                                <Form.Label>Имя пользователя</Form.Label>
                                <Form.Control id="username" name="username" type="text" placeholder="Введите имя пользователя"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control id="password" name="password" type="password" placeholder="Введите пароль"/>
                            </Form.Group>
                            <Button style={{marginRight: '10px'}} variant="primary" type="submit">Зарегистрироваться</Button>
                        </Form>
                    </Card.Body>
                </Card>

            </Container>
        </div>
    );
}