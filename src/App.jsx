import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from './components/pageComps/Header'
import { Main } from './pages/Main'
import { Question } from "./pages/Question";
import { FinishedScreen } from "./pages/FinishedScreen";
import { UsedQuestions } from "./pages/UsedQuestions";
import { SignUp } from './components/auth/SignUp'
import { Profile } from "./pages/Profile";


function App() {
  console.log('App is running!')

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header/>}>
          <Route index element={<Main/>}/>
          <Route path='quiz/:difficulty' element={<Question/>}/>
          <Route path='results' element={<FinishedScreen/>}/>
          <Route path='usedQuestions' element={<UsedQuestions/>}/>
          <Route path='signUp' element={<SignUp/>}/>
          <Route path='profile' element={<Profile/>}/>
        </Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App
