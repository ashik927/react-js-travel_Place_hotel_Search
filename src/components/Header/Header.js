import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../../images/icons/logo.png';
import { Button, Form, FormControl } from 'react-bootstrap';
import Body from '../Body/Body';
import { userContext } from '../../App';

const Header = () => {
    const [loggedInUser,setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const signIn=()=>{
        history.push("/login")
    }
    return (
        <div>
            
            <nav className="nav">
            
                <ul>
                    <Link to="/">
                    <li>
                        <img className="logo" src={logo} alt=""/>
                    </li>
                    </Link>
                </ul>
                <Form inline className="form">
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                       
                </Form>
                <ul className="one">
                    <li>
                        <Link to="/news">News</Link>
                    </li>
                    <li>
                        <Link to="/destination">Destination</Link>
                    </li>
                    <li>
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    
                    <li>
                        {
                        loggedInUser.email ? <Button onClick={()=>setLoggedInUser({})} variant="outline-primary">Sign Out</Button>
                         :<Button onClick={signIn} variant="outline-primary">Sign in</Button>
                        }
                    </li>
                    
                </ul>
               
            </nav>
                
        
       
        </div>
    );
};

export default Header;