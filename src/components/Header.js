import React, { useEffect, useState } from 'react';
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Avatar} from '@mui/material';
import Modal from './Modal';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

function Header() {
    
    
    const [user, setUser] = useState(null);
    const [openSignin, setOpenSignin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);
    
    const handleSignout = (e) => {
      e.preventDefault();
      signOut(auth).then(() => {
        setUser(null);
      }).catch((err) => {
        alert(err.message);
      })
    }
    useEffect(() => {
      onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
         
             setUser(authUser);
        }
      })
    }, []);
    console.log('====================================');
    console.log("auth>>>",user);
    console.log('====================================');
 
      
    return (
      <>
      <div className='header'>
          <div className='header__container'>
              <div className="header__logo">
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png' alt='logo' />    
            </div>
              
            <div className='header__search'>
                    <SearchIcon className='search__icon' />
                    <input type="text" placeholder="Search" />
              </div>
              
              {user ? ( <div className='header__icons'>
               
               <HomeIcon className='header__icon' />
               <SendIcon className='header__icon' />
               <AddCircleOutlineIcon className='header__icon' />
               <FavoriteBorderIcon className='header__icon'/>
               <Avatar  className='header__avatar' src="https://scontent.fdbd1-1.fna.fbcdn.net/v/t31.18172-8/14939567_695162700641423_6074991822732935176_o.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=4NlT178g9qkAX_8JUQ5&tn=5eJ5NDFK_jWXc_Kp&_nc_ht=scontent.fdbd1-1.fna&oh=00_AT9dhht8kcMHxP1anaHuXfNpVhG2hSpW5Lm9SJyrHhsWJw&oe=63309DC6"/>
               <button onClick={handleSignout} className='logout__button'>Log out</button>
              </div>) : (<div className='header__authentication'>
                           
                  <button onClick={() => {return <>{setOpenSignin(true)} {setOpenSignup(false)}</>}} className='login__button'>Log In</button>
                  <button onClick={() => <>{setOpenSignin(false)} {setOpenSignup(true)}</>} className='signup__button'>Sign Up</button>

              </div>) }
             
              
          </div>
          
    </div>
            {openSignup && <Modal signup setOpenSignup={() => setOpenSignup()} />}
            {openSignin && <Modal signin setOpenSignin={() => setOpenSignin()} />}
    
    </>
  )
}

export default Header
