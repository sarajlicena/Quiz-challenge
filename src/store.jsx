import { configureStore } from "@reduxjs/toolkit";
import difficultyReducer from './features/difficultySlice';
import timerReducer from './features/timerSlice';
import questionsReducer from './features/questionsSlice'

export const store = configureStore({
    reducer: {
        difficulty: difficultyReducer,
        timer: timerReducer,
        questions: questionsReducer
    }
})
