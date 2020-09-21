import React, { useState } from 'react';
import white from '../../images/white.jpg';
import Header from '../Header/Header';
import { useParams  } from 'react-router-dom';
import allhotel from '../../allhotel';

const HotelDetails  = (props) => {
    const {id } = useParams();
    return ( 
        <div style={{ backgroundImage: `url(${white})` }} className="header">
            <Header></Header>
            {
                 allhotel.filter(pd=>pd.id==id).map(hotelInformation=>(
                    <>
                        <h1 className="fontSize">{hotelInformation.name}</h1>
                        <p>{hotelInformation.hotelname}</p>
                    </>
                 ))
            }
            {/* <h1>I am booked</h1>
            <h1 className="fontSize">{hotel.name}</h1>
            <p>{hotel.hotelname}</p> */}
        </div>
    );
};

export default HotelDetails;