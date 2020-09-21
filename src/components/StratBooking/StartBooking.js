import React,{ useState } from 'react';
import { Button, Card, CardDeck, Col, Container, Row } from 'react-bootstrap';
import touristpalace from '../../touristpalace';
import { Link, useParams  } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './StartBooking.css';
import DatePicker from "react-datepicker";
import HotelDetails from '../HotelDetails/HotelDetails';
 


const StartBooking = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    // const [data , setData] = useState({});
    let {id} = useParams();
    let description = touristpalace.find(key=>key.id === id);
    
    const { register, handleSubmit, watch, errors } = useForm();
    

    return (
       
        <div>
            <Container className="body-margin">
                <Row>
                    
                <Col md={6} className="title-container">
                        <h1 className="fontSize">
                        {description.name}</h1>
                        <p>{description.description}</p>
                        
                </Col>
                    

                <Col md={6}>
                <form className="ship-form" >

                    <label className="input-color">Origin</label>
                    <input name="StartPlace" defaultValue="DHAKA" ref={register({ required: true })} />
                    {/* {errors.name && <span className="error">name is required</span>} */}
                    <label className="input-color">Destination</label>
                    <input name="DestinationName" defaultValue={description.name} ref={register({ required: true })} />
                    {/* {errors.email && <span className="error">email is required</span>} */}
                    <label className="input-color">Start Booking Date</label>
                    <DatePicker label="start" selected={startDate} onChange={date => setStartDate(date)} dateFormat='dd/MM/yyyy' minDate={startDate} />
                    <label className="input-color">End Booking Date</label>
                    <DatePicker label="start" selected={endDate} onChange={date => setEndDate(date)} dateFormat='dd/MM/yyyy' minDate={startDate} />
                    <br/> <br/>
                   
                      <Link to={"/hoteldetails/"+id}> <input style={{ backgroundColor:"orange" }} type="submit" defaultValue="START BOOKING"/> </Link>
                </form>
                 </Col>
                  </Row>
            </Container>
        </div>
    );
};
 

export default StartBooking;