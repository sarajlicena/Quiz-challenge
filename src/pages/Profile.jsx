import React from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { SignIn } from '../components/auth/SignIn';
import ProgressBar from 'react-customizable-progressbar'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

export const Profile =  () => {
  const [authUser, setAuthUser] = useState(null);
  const [data, setData] = useState([]);
  const [scores, setScores] = useState([]);
  const [easy, setEasy] = useState([]);
  const [medium, setMedium] = useState([]);
  const [hard, setHard] = useState([]);
  const [easyScore, setEasyScore] = useState([]);
  const [mediumScore, setMediumScore] = useState([]);
  const [hardScore, setHardScore] = useState([]);

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


  useEffect(() => {
    if (authUser !== null) {
      getDoc(doc(db, "users", authUser.email))
        .then(docSnap => {
          if (docSnap.exists()) {
            setData(docSnap.data());
            console.log("Document data:", docSnap.data());
          } else {
            console.log("No such document exists");
          }
        })
        .catch(error => {
          console.error("Error fetching document:", error);
        });

        getDoc(doc(db, "scores", authUser.email))
        .then(docSnap => {
          if (docSnap.exists()) {
            setScores(docSnap.data());
            console.log("Document data:", docSnap.data());
          } else {
            console.log("No such document exists");
          }
        })
        .catch(error => {
          console.error("Error fetching document:", error);
        });
    } else {
      console.log("No email");
    }
  }, [authUser]);

  useEffect(() => {
    if (scores.easy) { setEasy(scores.easy) } 
    if (scores.medium) { setMedium(scores.medium) }
    if (scores.hard) { setHard(scores.hard) }
  }, [scores]);

  useEffect(() => {
    if(easy && easy.length>0) {
      const easyTotal = easy.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      const easyMax = easy.reduce((max, score) => Math.max(max, score), 0);
      setEasyScore(((easyTotal/easyMax)*100).toFixed(2));
      console.log("Sum of easy array:", easyTotal);
    } else {
      setEasyScore(0)
    }
  }, [easy]); 


  useEffect(() => {
    console.log("Medium scores:", medium); 
    if (medium && medium.length>0) {
      const mediumTotal = medium.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      const mediumMax = medium.length * 320; 
      setMediumScore(((mediumTotal/mediumMax)*100).toFixed(2));
      console.log("Sum of medium array:", mediumMax);
    } else {
      setMediumScore(0);
    }
  }, [medium]);
  


  useEffect(() => {
    if(hard && hard.length>0) {
      const hardTotal = hard.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      const hardMax = hard.reduce((max, score) => Math.max(max, score), 0);
      setHardScore(((hardTotal/hardMax)*100).toFixed(2));
      console.log("Sum of hard array:", hardTotal);
    } else {
      setHardScore(0)
    }
  }, [hard]); 


  return (
    <div>
      {authUser ? (
         <main className='main'>
            <div>
                <div className='profileName'>
                    Welcome {data.name}
                </div>

                <div className="circles">
                 <div className='circle'>
                    <div className="circleTitle">
                            <span>EASY</span>
                        </div>

                        <ProgressBar
                            radius={100}
                            progress={easyScore}
                            strokeWidth={18}
                            strokeColor="#c26b80"
                            strokeLinecap="round"
                            trackStrokeWidth={18}
                            counterClockwise
                        >
                            <div className="indicator">
                                <div>{easyScore}%</div>
                            </div>
                        </ProgressBar>
                 </div>

                 <div className='circle'>
                    <div className="circleTitle">
                            <span>MEDIUM</span>
                        </div>

                        <ProgressBar
                            radius={100}
                            progress={mediumScore}
                            strokeWidth={18}
                            strokeColor="#c26b80"
                            strokeLinecap="round"
                            trackStrokeWidth={18}
                            counterClockwise
                        >
                            <div className="indicator">
                                <div>{mediumScore}%</div>
                            </div>
                        </ProgressBar>
                 </div>

                 <div className='circle'>
                    <div className="circleTitle">
                            <span>HARD</span>
                        </div>

                        <ProgressBar
                            radius={100}
                            progress={hardScore}
                            strokeWidth={18}
                            strokeColor="#c26b80"
                            strokeLinecap="round"
                            trackStrokeWidth={18}
                            counterClockwise
                        >
                            <div className="indicator">
                                <div>{hardScore}%</div>
                            </div>
                        </ProgressBar>
                 </div>
            </div>
            </div>
         </main>
      ) : (
        <SignIn/>
      )}
    </div>
  );
}
