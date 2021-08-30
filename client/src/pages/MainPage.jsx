import React from 'react';
import { Container } from 'react-bootstrap';
import hero_img from '../static/hero.jpg';

export default function MainPage(){
    return(
        <div>
            <section style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${hero_img})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                }}>
                <Container style={{textAlign: 'center', color: 'white', overflow: 'hidden'}}>
                    <div style={{margin: '25% 0'}}>
                        <h1>Main Page</h1>
                        <h2>Description</h2>
                    </div>
                </Container>
            </section>
        </div>
    );
}