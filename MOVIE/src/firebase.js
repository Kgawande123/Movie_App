
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc,  collection,  getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA_fA-P_We4zm0jjTou0wTPFLtj_kalT-s",
  authDomain: "netflix-clone-d9a6a.firebaseapp.com",
  projectId: "netflix-clone-d9a6a",
  storageBucket: "netflix-clone-d9a6a.appspot.com",
  messagingSenderId: "534090362754",
  appId: "1:534090362754:web:360ba9940ff1de6c8a299b"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: name,
        authProvider: "local",
        email: email,
      });
    } catch (err) {
      console.error(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
    }
  };
  

    

const login = async( email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);

    } catch(error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }

}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup,logout};