import React, { useState } from 'react';
import { Button, Card, CardDeck, Col, Container, Row } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import header from '../../images/header.png';
// import sreemongol from '../../images/sreemongol.png';
// import sundorbon from '../../images/sundorbon.png';
import touristpalace from '../../touristpalace';
import BodyShow from '../BodyShow/BodyShow';
import BodyPlaceDescription from './BodyPlaceDescription';

const Body = () => {
    const fakeData = touristpalace;
    const [place , setPlace] = useState(fakeData);
    const [description , setDescription] = useState({});
    const handleShowdes=(des)=>{
         const getDescription = place.find(key =>key.id===des);
          setDescription(getDescription);
    }
   
    return (
        <div>
            <Container className="body-margin">
                <Row>
                    {
                       
                            <BodyPlaceDescription  description={description}>

                            </BodyPlaceDescription>
                        
                    }

                <Col md={7}>
                        <CardDeck>

                            {
                                place.map(pd=>
                                    <BodyShow 
                                    handleShowdes={handleShowdes}
                                     place={pd}
                                     >

                                    </BodyShow>
                                )
                            }
                        
                        </CardDeck>
                     </Col>
                  </Row>
            </Container>
        </div>
    );
};

export default Body;