import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {userContext} from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBModalFooter, MDBRow } from 'mdbreact';


firebase.initializeApp(firebaseConfig);
function Login() {
  const [loggedInUser,setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [newUser , setNewUser] = useState(false);
  const[user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password:'',
    error:'',
    success:false,
    photoUrl:''
  });
  const provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleClick=()=>{
    firebase.auth().signInWithPopup(provider)
    .then(res=>{
       const{displayName, email, photoURL}= res.user;
       const signedInUser ={
        isSignedIn: true,
        name: displayName,
        email:email ,
        photoUrl:photoURL
       }
       setUser(signedInUser);
       setLoggedInUser(signedInUser);
       history.replace(from);
       
    })
 }
 const handleFbLogin=()=>{
    firebase.auth().signInWithPopup(fbProvider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        console.log(result);
        const{displayName, email, photoURL}= result.user;
       const signedInUser ={
        isSignedIn: true,
        name: displayName,
        email:email
       }
        var user = result.user;
        console.log(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
       // ...
      }
      

      )
      .catch(function(error) {
        
        var errorCode = error.code;
        var errorMessage = error.message;
        setUser(errorMessage);
        
        var email = error.email;
        
        var credential = error.credential;
        // ...
      });
    
 }
 const handleClickSignOut=() => {
  firebase.auth().signOut()
  .then(res =>{
   const signedOutUser={
     isSignedIn: false,
     name:'',
     email:'',
     photoUrl:''
   }
   setUser(signedOutUser)
   
 })
}
const handleSubmit=(e) => {
  if(newUser && user.email && user.password){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(res=>{
      const newUserInfo = {...user};
      newUserInfo.success =true;
      newUserInfo.error='';
      userUpdateName(user.name);
      setUser(newUserInfo);
      console.log("user info", res.user);
    })
    .catch(error =>{
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success=false;
      setUser(newUserInfo);
    });
  }
  if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res=>{
      const newUserInfo = {...user};
      newUserInfo.success =true;
      newUserInfo.error='';
      setLoggedInUser(newUserInfo);
      history.replace(from);
      setUser(newUserInfo);
    })
    .catch(error =>{
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success=false;
      setUser(newUserInfo);
    });
  }
  e.preventDefault()
}
const handleBlur = (e) => {
      
      let isFieldValid = true;
      if(e.target.name==="email"){
        isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      }
      if(e.target.name==="password"){
        const isPasswordLength = e.target.value.length>6;
        const isPasswordTest = /\d{1}/.test(e.target.value);
        isFieldValid = isPasswordLength && isPasswordTest;
      }
      if(isFieldValid){
        const setNewInfo = {...user};
        setNewInfo[e.target.name] = e.target.value;
        setUser(setNewInfo);
      }
}
 const userUpdateName = name => {
  var user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  }).then(function() {
   console.log("user name set success");
  }).catch(function(error) {
    console.log(error);
  });
 }

  return (
    <div className="App" style={{ backgroundColor:"white" }}>
     <MDBContainer>
      <MDBRow>
      <MDBCol md="3">
        </MDBCol>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong> {newUser  ? "Sign Up":"Sign In"}</strong>
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                {
                  newUser &&
              <MDBInput
                label="Your Name"
                group
                required
                type="text"
                name="name"
                validate
                onBlur={handleBlur}
              />
                }
              <MDBInput
                label="Your email"
                group
                required
                type="email"
                validate
                onBlur={handleBlur} name="email"
              />
              <MDBInput
                label="Your password"
                group
                minlength="7"
                required
                type="password"
                validate
                onBlur={handleBlur} name="password"
              />
              <p className="font-small blue-text d-flex justify-content-end pb-3">
                 {!newUser  && "Forgot  Password"}
               
              </p>
              <div className="text-center mb-3">
                <MDBBtn
                  type="submit"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                >
                  {newUser  ? "Sign UP":"Sign In"}
                </MDBBtn>
                
              </div>
              </form>
              <p style={{ color:'red' }}> {user.error}</p>
                  {
                    user.success && <p style={{ color:'green' }}> {newUser ? "User created successfully" : ""} </p>
                  }
              <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">

                or Sign in with:
              </p>
              <div className="row my-3 d-flex justify-content-center">
                <MDBBtn
                onClick={handleFbLogin}
                  type="button"
                  color="white"
                  rounded
                  className="mr-md-3 z-depth-1a"
                >
                  <MDBIcon  fab icon="facebook-f" className="blue-text text-center" />
                </MDBBtn>
                
                <MDBBtn
                  type="button"
                  color="white"
                  onClick={handleClick}
                  rounded
                  className="z-depth-1a"
                >
                  <MDBIcon  fab icon="google-plus-g" className="blue-text" />
                </MDBBtn>
              </div>
            </MDBCardBody>
            <MDBModalFooter className="mx-5 pt-3 mb-1">
              <p className="font-small grey-text d-flex justify-content-end">
                Not a member?
                <a  className="blue-text ml-1" onClick={()=>setNewUser(!newUser)} name="newUser" >

                {newUser  ? "Sign In":"Sign Up"}
                </a>
              </p>
              
            </MDBModalFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
     
   </div>
  );
}

export default Login;
