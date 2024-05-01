import React from 'react'
import { StartScreen } from '../components/pageComps/StartScreen'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { SignIn } from '../components/auth/SignIn';
import { auth } from "../firebase";

export const Main = () => {
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


  return (
    <div>
      {authUser ? (
         <main className='main'>
            <StartScreen/>
         </main>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
