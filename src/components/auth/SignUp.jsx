import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc, collection } from "firebase/firestore"; 
import '../../index.css'

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [authUser, setAuthUser] = useState(null);

  console.log(authUser);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const usersRef = collection(db, "users");
  const scoresRef = collection(db, "scores");

  const signUp =  (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);

        setDoc(doc(usersRef, email), {
          name: name
        });

        setDoc(doc(scoresRef, email), {});
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {authUser ? (
         <form onSubmit={signUp}>
         <div className="signDiv">
          <div className="title">
              <p className="titlep1">Welcome!</p>
              <p className="titlep2">Please sign up to play</p>
          </div>
          <div className="details">
          <label><p className="description">Name</p></label>
          <input className="password" type="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
          <br></br> 
          <br></br> 
          <label><p className="description">Email</p></label>
          <input className="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label><p className="description">Password</p></label>
          <input className="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <br></br>
          <div className="signUpButtons">
            <button className="signupbtn" type="submit">Sign Up</button>
            <button className="signupbtn"><Link className="link2" to="/">Main Menu</Link></button>
          </div>
          <div className="title2">
              <p className="titlep2">Sign up successful!</p>
          </div>
          </div>
      </form>
      ) : (
        <form onSubmit={signUp}>
        <div className="signDiv">
         <div className="title">
             <p className="titlep1">Welcome!</p>
             <p className="titlep2">Please sign up to play</p>
         </div>
         <div className="details">
         <label><p className="description">Name</p></label>
         <input className="password" type="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
         <br></br> 
         <br></br> 
         <label><p className="description">Email</p></label>
         <input className="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
         <label><p className="description">Password</p></label>
         <input className="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
         </div>
         <br></br>
         <div className="signUpButtons">
           <button className="signupbtn" type="submit">Sign Up</button>
           <button className="signupbtn"><Link className="link2" to="/">Main Menu</Link></button>
         </div>
         </div>
     </form>
      )}
    </div>
  );
};
