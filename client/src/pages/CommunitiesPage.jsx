import React, { useEffect } from 'react';
import { Container, ListGroup, Col, Row, Tab, Form, Card, Button, Modal } from 'react-bootstrap';

export default function CommunitiesPage(){
    const [communities, setCommunities] = React.useState([]);
    const [show, setShow] = React.useState(false);
    useEffect(()=>{
        fetch('/communities')
            .then(response=>response.json())
            .then(data=>setCommunities(data));
    }, []);
    return(
        <Container className='mt-3'>
            <Modal centered show={show} onHide={()=>setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Новое сообщество</Modal.Title>
                </Modal.Header>
                <Form action='/newcommunity' method='post'>
                    <Modal.Body>
                        <Form.Group className='mb-3'>
                            <Form.Label>Название сообщества</Form.Label>
                            <Form.Control id='communityname' name='communityname' type='text' placeholder='Введите название сообщества'></Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Описание сообщества</Form.Label>
                            <Form.Control id='description' name='description' type='text' placeholder='Введите описание сообщества'></Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='primary' type='submit'>Создать</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Card>
                <Card.Header className='d-flex justify-content-between'>
                    <Card.Text className='mb-0' style={{lineHeight: '40px'}}>Сообщества</Card.Text>
                    <Button onClick={()=> setShow(true)} variant='primary'>Создать сообщество</Button>
                </Card.Header>
                <Card.Body>
                    <ListGroup>
                        {communities.map((community)=>{
                            return (
                            <ListGroup.Item action>
                                {community.communityname}
                            </ListGroup.Item>)
                        })}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    );
}