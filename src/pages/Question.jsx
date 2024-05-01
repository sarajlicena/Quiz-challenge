import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../components/pageComps/Loader'
import { ErrorMessage } from '../components/pageComps/ErrorMessage'
import { Progress } from '../components/pageComps/Progress'
import { Next } from '../components/pageComps/Next'
import { Timer } from '../components/pageComps/Timer'
import { useDispatch, useSelector } from 'react-redux'
import { restartTimer } from '../features/timerSlice'
import { getQuestions, newAnswer } from '../features/questionsSlice'

export const Question = () => {
    const {difficulty} = useParams()
    const {gameMode} = useSelector(store => store.difficulty)
    const {status, index, currentQuestion, answer} = useSelector(store => store.questions)
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(restartTimer())
      dispatch(getQuestions(gameMode))
    },[])

    useEffect(()=>{
      window.scrollTo(0, 0);
    },[index])

    const statement = currentQuestion?.question
    const options = currentQuestion?.options
    const hasAnswered = answer !== null
    
    
  return (
    <main className='main'>
      {status === 'loading' && <Loader/>}
      {status === 'error' && <ErrorMessage/>}
      {status === 'ready' && 
      <>
      <Progress/>
      <div className='question-cont'>
        <h4>{statement}</h4>
        <div className="options">
          {options?.map(option=>{
            return <button key={option} className={`btn btn-option ${answer === option ? 
            "answer" : ""} 
            ${hasAnswered ? currentQuestion.correctAnswer === option
            ? "correct" : "" : ""}`} 
            disabled={hasAnswered}
            onClick={()=>dispatch(newAnswer(option))}>{option}</button>
          })}
        </div>
      </div> 
      <footer>
        <Timer />
        {answer && <Next/>}
      </footer>
      </>}
    </main>
  )
}
