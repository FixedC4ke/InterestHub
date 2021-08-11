import React, { useEffect } from 'react';
import {Card, Container} from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function ProfilePage(){
    const [user, setUser] = React.useState(null);
    const [pfp, setPfp] = React.useState(null);
    let { id } = useParams();
    useEffect(()=>{
        fetch(`/getuser/${id}`)
            .then(response=>response.json())
            .then(data=>{
                setUser(data);
                fetch(`/profilepicture/${id}`)
                    .then(response=>response.blob())
                    .then(image=>setPfp(URL.createObjectURL(image)));
            });
    }, [id]);
    if (!user) return null;
    return(
        <div>
            <Container className='mt-3'>
                <Card>
                    <Card.Header>Информация о пользователе {user.username}</Card.Header>
                    <Card.Body>
                        <Card.Img className='d-inline-block img-thumbnail' style={{width: '200px', height: '200px'}} src={pfp} alt="Аватарка" />
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}