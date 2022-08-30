 import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Post from './components/Post';
import PostInput from './components/PostInput';
import { onAuthStateChanged } from "firebase/auth";
import { auth }  from "./firebase";
import { getDocs, collection,query, orderBy,onSnapshot } from "firebase/firestore";
import db from "./firebase";

function App() {
  
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      }
    })
  }, []);

  useEffect(() => {
    const postRef = collection(db, "posts");
    const orderedRef = query(postRef, orderBy("timestamp", "desc"))

    getDocs(orderedRef)
      .then((snapshot) => {
        const allPosts = snapshot.docs.map((doc) => {
          return doc.data();
        })
        console.log("allPosts>>>>>", allPosts);
        setPosts(allPosts);
        
      })

    
  }, []);

  console.log("posts>>>>>>>",posts);

  return (  
    <div className="app">
      <Header />
      <div className='app__body'>
        {user && <PostInput user={ user } />}

        {posts.map((post) => {
          return <Post 
                key={post.postImg}
                profilePic="https://scontent.fdbd1-1.fna.fbcdn.net/v/t31.18172-8/14939567_695162700641423_6074991822732935176_o.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=4NlT178g9qkAX_8JUQ5&tn=5eJ5NDFK_jWXc_Kp&_nc_ht=scontent.fdbd1-1.fna&oh=00_AT9dhht8kcMHxP1anaHuXfNpVhG2hSpW5Lm9SJyrHhsWJw&oe=63309DC6"
                username="Abhi Raj"
                postImage={post.postImg}
                caption={post.caption.caption}
              />
          
         
        })}

        <Post 
          key={69}
          profilePic="https://scontent.fdbd1-1.fna.fbcdn.net/v/t31.18172-8/14939567_695162700641423_6074991822732935176_o.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=4NlT178g9qkAX_8JUQ5&tn=5eJ5NDFK_jWXc_Kp&_nc_ht=scontent.fdbd1-1.fna&oh=00_AT9dhht8kcMHxP1anaHuXfNpVhG2hSpW5Lm9SJyrHhsWJw&oe=63309DC6"
          username="Abhi Raj"
          postImage="https://icapps.com/uploads/site/what-is-the-right-background-for-a-react-native-developer/_1200x630_crop_center-center_82_none/React_Native_image.jpg?mtime=1594715542"
          caption="Yoo, We are learning React.."
        />
        <Post 
          key={669}
          profilePic="https://scontent.fdbd1-1.fna.fbcdn.net/v/t31.18172-8/14939567_695162700641423_6074991822732935176_o.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=4NlT178g9qkAX_8JUQ5&tn=5eJ5NDFK_jWXc_Kp&_nc_ht=scontent.fdbd1-1.fna&oh=00_AT9dhht8kcMHxP1anaHuXfNpVhG2hSpW5Lm9SJyrHhsWJw&oe=63309DC6"
          username="Shishu"
          postImage="https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/disha_patani_36.jpg"
          caption="This is detail my boy......."
        />
      </div>
    </div>
  );
}

export default App;
