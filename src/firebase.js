import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyC9slsKSlz8Sx7z2vUpLajf3JZ_M_GtMZ0",
    authDomain: "instagram-clone-ec8fd.firebaseapp.com",
    projectId: "instagram-clone-ec8fd",
    storageBucket: "instagram-clone-ec8fd.appspot.com",
    messagingSenderId: "806177616691",
    appId: "1:806177616691:web:4470f28b8736603afd0446"
};
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { auth };
export default db;



