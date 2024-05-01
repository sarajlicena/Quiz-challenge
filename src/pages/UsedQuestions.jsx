import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import {resetQuiz} from '../features/questionsSlice'

export const UsedQuestions = () => {
    const {usedQuestions} = useSelector(store => store.questions)
    const {gameMode} = useSelector(store => store.difficulty)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleMain = () => {
        dispatch(resetQuiz());
        navigate(`/`);
      };
  
    const handleReset = () => {
        dispatch(resetQuiz());
        navigate(`/quiz/${gameMode}`);
    };

   
    return (
        <div>
            <div className='used-questions'>
            <ul>
                {usedQuestions.map(questionId => (
                    <li key={questionId}>{questionId}</li>
                ))}
            </ul>
        </div>

        <br></br><br></br>

            <div className='reset-btns'>
                <button className='btn btn-end' onClick={handleMain}>Main Menu</button>
                <button className='btn btn-end' onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}