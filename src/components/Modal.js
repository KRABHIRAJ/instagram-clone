import React, { useEffect, useState } from 'react';
import "./Modal.css";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

function Modal({ signup, signin, setOpenSignup, setOpenSignin }) {
    const handleClose = () => {
        { signup && setOpenSignup(false) }
        { signin && setOpenSignin(false) }
  }
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((authUser) => {

    })
    .catch((err) => {
      alert(err.message);
  })


    updateProfile(auth.currentUser, {
      displayName:{username},
    })

    
    setEmail("");
    setPassword("");
    setOpenSignup(false)
  }

 
  const handleSignin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
          console.log("Logging in user>>>>>>>>>",authUser.user);
      })
      .catch((err) => {
        alert(err.message);
      })
    
      setEmail("");
    setPassword("");
    setOpenSignin(false)
  }

  
    
  return (
   
    <div className='modal__background'>
    
          <div className='modal__container'>
            <div className='modal__closeButton'>
                <button onClick={handleClose}>X</button>     
            </div>
              <img 
                  className='modal__logo'
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png'
                  alt='LOGO'
              />
                <form>
                {signup && <input
                      className='input__tag username'
                      type="text"
                      placeholder="Please enter Username..."
                      value={username}
                      onChange = {(e) => setUsername(e.target.value)}
                  />}
                  
                  <input
                      className='input__tag email'
                      type="text"
                      placeholder="Please enter email..."
                      value={email}
                      onChange = {(e) => setEmail(e.target.value)}
                  />
                  <input
                      className='input__tag password'
                      type="password"
                      placeholder="Please enter password..."
                      value={password}
                      onChange = {(e) => setPassword(e.target.value)}
                  />
                  
                  {signup && <button type='submit' onClick={handleSignup} className='modal__button'>Sign up</button>}
                  {signin && <button type='submit' onClick={handleSignin} className='modal__button'>Sign in</button>}
                  
              </form>

        </div>
    </div>
  )
}

export default Modal
