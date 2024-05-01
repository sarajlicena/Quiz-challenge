import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from '../../firebase'
import { Link } from "react-router-dom";

export const DropdownMenu = () => {
    const [authUser, setAuthUser] = useState(null);

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

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };
  
  return (
    <div>
      {authUser ? (
        <div className="dropdown-menu">
        <ul>
          <li><Link className="link3" to='/profile'>My profile</Link></li>
          <li onClick={userSignOut}>Sign out</li>
        </ul>
      </div>
      ) : (
        <div className="dropdown-menu">
        <ul>
        <li><Link className="link3" to='/profile'>My profile</Link></li>
        </ul>
      </div>
      )}
    </div>
  );
  
};