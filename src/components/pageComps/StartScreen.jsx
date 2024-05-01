import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectGameMode } from '../../features/difficultySlice';
import { useDispatch } from 'react-redux'


export const StartScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [mode, setMode] = useState("");


  const handleClick = (e)=>{
        localStorage.setItem('mode', JSON.stringify(e.target.value));
        dispatch(selectGameMode(e.target.value))
        navigate(`/quiz/${e.target.value}`)
  };  
      

  return (
    <div className='start-screen'>
        <h3>It's always fun to learn new things!</h3>
        <h4 style={{marginTop:"20px"}}>Choose the difficulty:</h4>
        <div className="game-mode">
            <button className='btn2' value='easy' onClick={(e)=>handleClick(e)}>Easy</button>
        </div>
        <br></br>
        <div className="game-mode">
            <button className='btn2' value='medium' onClick={(e)=>handleClick(e)}>Medium</button>
        </div>
        <br></br>
        <div className="game-mode"> 
            <button className='btn2' value='hard' onClick={(e)=>handleClick(e)}>Hard</button>
        </div>
    </div>
  )
}
