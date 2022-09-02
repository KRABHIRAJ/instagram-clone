import React, { useEffect, useState } from 'react';
import "./PostInput.css";
import { collection, addDoc,getDocs, serverTimestamp  } from "firebase/firestore";
import db from "../firebase";
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";



function PostInput({user}) {
    // const [userName, setUserName] = useState("");
    const [caption, setCaption] = useState("");
    const [imagefile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const storage = getStorage();
    const email = user.email;
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    }

   console.log('====================================');
   console.log("user in postinput" , user.email);
   console.log('====================================');

    const sendPost = (e) => {
        e.preventDefault();

        const imageRef = ref(storage, `images/${imagefile.name + v4()}`);
            uploadBytes(imageRef, imagefile)
                .then((snapshot) => {
                    
                    getDownloadURL(snapshot.ref).then((url) => {
                        setImageUrl(url);
                        const postref = collection(db, "posts"); 
                        addDoc(postref, {
                            username:{email},
                            postImg: url,
                            caption: { caption },
                            timestamp: serverTimestamp(),
                        });
                         postAllData();   
                        
                    })
                })
                .catch((err) => {
                    alert(err.message);
                })
    }


    const postAllData = () => {
        
        
        setCaption("");
        alert("Successfully uploaded.... refresh page to view your post")
       
       
    }
    console.log("url downloaded>>>>>>>", imageUrl);

  return (
    <div className='postinput'>
      <form>  
        <input
            className='input__tag'
             type="text" 
             placeholder='Enter Post Caption'
             required
             value={caption}
             onChange = {(e) => setCaption(e.target.value)}
        />
        <input
             type="file" 
             className='input__tag'
             required
             onChange={handleFileChange}
        />
        <button onClick={sendPost} className='modal__button' type='submit'>Post</button>
      </form>
    </div>
  )
}

export default PostInput;
