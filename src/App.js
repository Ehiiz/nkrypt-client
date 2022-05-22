import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import Landing from './pages/Landing';
import Setlock from './pages/Setlock';
import Quiz from './pages/Quiz';
import Passcode from './pages/Passcode';
import Unlocked from './pages/Unlocked';
import Createkrypt from './pages/Createkrypt';
import Multichoice from './pages/Multichoice';
import Success from './pages/Success';
import Settings from './pages/Settings';
import Answerpass from './pages/Answerpass';
import AnswerQuiz from './pages/AnswerQuiz';
import Answermulti from './pages/Answermulti';




function App() {


  return (
    <div className="font-poppins bg-secondary-600">
      <Router>
       <Routes>
        <Route path="/profile/:id" exact element={<Profile />}/>
        <Route path="/" exact element={<Signin />}/>
        <Route path="/signup" exact element={<Signup />}/>
        <Route path="/home" exact element={<Home />}/> 
        <Route path="/notifications" exact element={<Notifications />}/>
        <Route path="/krypt/:id" exact element={<Landing />}/>
        <Route path="/setlock/:id" exact element={<Setlock />}/>
        <Route path="/quiz/:id" exact element={<Quiz />}/>
        <Route path="/passcode/:id" exact element={<Passcode />}/>
        <Route path="/unlock/:id" exact element={<Unlocked />}/>
        <Route path="/create" exact element={<Createkrypt />}/>
        <Route path="/choice/:id" exact element={<Multichoice />} />
        <Route path="/share/:id" exact element={<Success />} />
        <Route path="/settings" exact element={<Settings />} />
        <Route path="/p-unlock/:id" exact element={<Answerpass />} />
        <Route path="/q-unlock/:id" exact element={<AnswerQuiz />} />
        <Route path="/m-unlock/:id" exact element={<Answermulti />}/>
       </Routes>
    </Router>


    </div>

  

     

      

  );
}

export default App;
