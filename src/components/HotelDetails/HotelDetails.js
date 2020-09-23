import React, { useContext, useState } from 'react';
import white from '../../images/white.jpg';
import Header from '../Header/Header';
import { useParams  } from 'react-router-dom';
import allhotel from '../../allhotel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

import { Button, Card, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Map, TileLayer } from 'react-leaflet';
import { Marker } from 'leaflet';
import Iframe from 'react-iframe';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { userContext } from '../../App';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

const HotelDetails  = (props) => {
    const [startDate,setStartDate] = useContext(userContext);
    const [endDate,setEndDate] = useContext(userContext);
    const classes = useStyles();
    const[map, setMap] = useState({});
    const {id } = useParams();
    let mapInfo = allhotel.find(key=>key.id === id);
    const handleShowMap=(hotelname)=>{
        const getMap = allhotel.find(key =>key.hotelname===hotelname);
        setMap(getMap)
    }
 
    return ( 
        <div style={{ backgroundImage: `url(${white})` }} >
             <Header/>
            
                <Row>
                    <Col md={6}>
                        <h3 className="App">{mapInfo.name}</h3>
                        {/* <p>{startDate} TO {endDate}</p> */}
                        {
                            allhotel.filter(pd=>pd.id===id).map(hotelInformation=>(
                                <>
                                    <br/>
                                    <div className={classes.root}>
                                        <Paper className={classes.paper}>
                                            <Grid container spacing={2}>
                                            <Grid item>
                                                <ButtonBase className={classes.image}>
                                                <img className={classes.img} alt="complex" src={hotelInformation.img} />
                                                </ButtonBase>
                                            </Grid>
                                            <Grid item xs={12} sm container>
                                                <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="subtitle1">
                                                    Name : {hotelInformation.hotelname}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                    Bed Type : {hotelInformation.bedType}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                    Capcity : {hotelInformation.capacity}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Button onClick={()=>handleShowMap(hotelInformation.hotelname)} variant="outline-primary" style={{ cursor: 'pointer' }}>
                                                        Get Map Location
                                                    </Button>
                                                </Grid>
                                                </Grid>
                                                <Grid item>
                                                <Typography variant="subtitle1">${hotelInformation.price}</Typography>
                                                </Grid>
                                            </Grid>
                                            </Grid>
                                        </Paper>
                                    </div>

                                </>
                            ))
                            
                        }
                       
                    </Col>
                    <Col>
                    <Col md={12}>
                    <Map center={mapInfo.cordinate} zoom={12}>
                        <TileLayer 
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </Map>
                    </Col>
                    <Col md={3}>
                        {
                        
                    <Iframe 
                    src={map.iframe} width="620" height="400" style={{ border:"none" }}   frameborder={{}  } aria-hidden="true" tabindex="none">
                    </Iframe>
                        }
                        </Col>
                    </Col>
                </Row>
           
        </div>
    );
};

export default HotelDetails;