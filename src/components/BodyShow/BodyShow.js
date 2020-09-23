import React from 'react';
import { Button, Card, CardDeck, Col, Container, Row } from 'react-bootstrap';
const BodyShow = (props) => {
    const{name , img , description, id}=props.place;
  
    return (

        <Card  onClick={()=>props.handleShowdes(id)} style={{cursor:"pointer" , backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${img})` }} className="all-card">
            <h1 className="footer">
                {name}
                {/* <Button variant="outline-primary" onClick={()=>props.handleShowdes(id)}>click me</Button> */}
            </h1>
        </Card>
        
 );
};

export default BodyShow;