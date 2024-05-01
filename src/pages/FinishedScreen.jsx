import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { resetQuiz } from '../features/questionsSlice'
import { auth, db } from '../firebase'
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export const FinishedScreen = () => {
    const {points, highscore, usedQuestions} = useSelector(store => store.questions)
    const {gameMode} = useSelector(store => store.difficulty)
    const percentage = Math.ceil(points*100/300)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [authUser, setAuthUser] = useState(null);
    const [email, setEmail] = useState("");
    const dif = localStorage.getItem('mode');
    const mode = dif.replace(/"/g, '');

    console.log(authUser);

    useEffect(() => {
      const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthUser(user);
          setEmail(user.email)
        } else {
          setAuthUser(null);
        }
      });

      return () => {
        listen();
      };
    }, []);


    console.log(mode)

    console.log(email)

    const handleUpdateScore = (email, points) => {
      if (email) {
        updateDoc(doc(db, 'scores', email), {
          [mode]: arrayUnion(points)
        });
      } else {
        // Handle the case where user or user.email is null or undefined
        console.error('User or email is null or undefined');
      }
    };

    const handleMain = () => {
      handleUpdateScore(email, points);
      localStorage.clear();
      dispatch(resetQuiz());
      navigate(`/`);
    };

    const handleuQ = () => {
      handleUpdateScore(email, points);
      localStorage.clear();
      navigate(`/usedQuestions`);
    };

    const handleReset = () => {
      handleUpdateScore(email, points);
      localStorage.clear();
      dispatch(resetQuiz());
      navigate(`/quiz/${gameMode}`);
    };
    
    let congrats
    if(percentage === 100) congrats = "Perfect!"
    if(percentage >= 80 && percentage < 100) congrats = "Excellent!"
    if(percentage >= 50 && percentage < 80) congrats = "Good!"
    if(percentage > 0 && percentage < 50) congrats = "Better luck next time!"
    if(percentage === 0) congrats = "Oh no!"


  return (
    <>
        <p className='result'>
           {congrats} You scored <strong>{points}</strong> out of 300 ({percentage}%)
        </p>
        <p className='highscore'>Thank you for playing!</p>
        <div className='reset-btns'>
            <button className='btn btn-end' onClick={handleMain}>Main Menu</button>
            <button className='btn btn-end' onClick={handleuQ}>Questions</button>
            <button className='btn btn-end' onClick={handleReset}>Reset</button>
        </div>
    </>
  )
}
