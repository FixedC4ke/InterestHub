import React from 'react';
import {Container, Form, Button} from 'react-bootstrap';

export default function LoginPage(){
    return (
        <div>
            <Container>
                <Form method="POST" action="/login" className="mt-3">
                    <Form.Group className="mb-3">
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control id="username" name="username" type="text" placeholder="Введите имя пользователя"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control id="password" name="password" type="password" placeholder="Введите пароль"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Войти</Button>
                    <a href="/restoreAccess">Забыли пароль?</a>
                </Form>
            </Container>
        </div>
    );
}