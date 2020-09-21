import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import header from './images/header.png';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import Body from './components/Body/Body';
import Login from './components/Login/Login';
import StartBooking from './components/StratBooking/StartBooking';
import Nothing from './components/Nothing/Nothing';
import HotelDetails from './components/HotelDetails/HotelDetails';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App() {
  const [loggedInUser , setLoggedInUser]= useState({})
  return (
    <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${header})` }} className="header">
      <userContext.Provider value={[loggedInUser , setLoggedInUser]}>
        email:{loggedInUser.email}
      <Router>
         
         <Switch>
          
          <Route exact path="/">
          <Header/>
          <Body/>
         </Route>
          <Route path="/login">
            <Header/>
            <Login />
          </Route>
          <Route path="/startbooking/:id">
           <Header/>
            <StartBooking />
          </Route>
          <PrivateRoute path="/hoteldetails/:id">
            <HotelDetails />
            
          </PrivateRoute>
          <Route  path="*">
            <Nothing></Nothing>
            
          </Route>
          </Switch>
         
      </Router>
      </userContext.Provider>
     </div>
     
  );
}

export default App;
