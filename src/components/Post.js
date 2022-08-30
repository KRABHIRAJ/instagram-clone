import { Avatar } from '@mui/material';
import React from 'react';
import "./Post.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SendIcon from '@mui/icons-material/Send';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';


function Post({profilePic, username, postImage, caption}) {
  return (
    <div className='post'>
        <div className='post__header'>
            <div className='postHeader__left'>
                 <Avatar src={profilePic} className='post__avatar' /> 
                 <strong>{username}</strong>
            </div>
            
            <div className='postHeader__right'>
                <MoreHorizIcon className='postHeader__rightIcon' />
            </div> 
        </div>
        
        <div className='post__body'>
            <img src={postImage} alt='Image0' />
        </div>
        
        <div className='post__footer'>
            <div className='postFooter__left'>
                  <FavoriteBorderIcon className="postFooter__Icon"/>
                  <ModeCommentOutlinedIcon className="postFooter__Icon" />
                  <SendIcon className="postFooter__Icon" />
            </div>
            <div className='postFooter__right'>
                <TurnedInNotIcon className="postFooter__Icon" />
            </div>
        </div>
        
        <strong>69 likes</strong>
        <div className='post__details'>
            <span><strong>{username}</strong> {caption}</span>
        </div>
        
        <div className='post__comment'>
            <div className="postContent__left">
                  <SentimentSatisfiedAltIcon className='postContent__icon' />
                  <input type="text" placeholder='Add a comment...' />
            </div>
            
            <div className='postComment__right'>
                <strong>Post</strong>
            </div>
        </div>
        
    </div>
  )
}

export default Post
