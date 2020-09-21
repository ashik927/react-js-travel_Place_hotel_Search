import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BodyPlaceDescription = (props) => {
    const{name , description,id}= props.description;
    
    return (
        <Col md={5} className="title-container">
                        <h1 className="fontSize">{name}</h1>
                        <p>{description}</p>
                        <Link to={"/startbooking/"+id}>
                        {
                            name && <Button variant="outline-primary">Booking</Button>
                        }
                        </Link>
          </Col>
        
    );
};

export default BodyPlaceDescription;