import React from 'react';
import { Container } from 'react-bootstrap';

export default function Footer(){
    return(
        <footer className='position-absolute bottom-0 bg-dark text-white w-100' style={{height: '50px', lineHeight: '50px'}}>
              <Container>
                  <p className='m-0'>Copyright</p>
              </Container>
          </footer>
    );
}