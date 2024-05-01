import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from '../../firebase'
import '../../index.css'

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <form onSubmit={signIn}>
       <div className="signDiv">
        <div className="title">
            <p className="titlep1">Welcome!</p>
            <p className="titlep2">Please sign in to play</p>
            <br></br>
        </div>
        <div className="details">
        <label><p className="description">Email</p></label>
        <input className="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label><p className="description">Password</p></label>
        <input className="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <br></br>
        <button className="signinbtn" type="submit">Sign In</button>
        <p className="signupreminder">Don't have an account?<button ><Link to="/signUp">Sign Up</Link></button></p>
        </div>
    </form>
  );

};
