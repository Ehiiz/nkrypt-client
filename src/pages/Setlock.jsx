import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import {Link, useNavigate} from "react-router-dom";
import {ReactComponent as Choices} from "../svg/fluent_quiz-new-48-filled.svg"
import {ReactComponent as Password} from "../svg/fluent_password-16-filled.svg"
import {ReactComponent as Quiz} from "../svg/healthicons_i-exam-multiple-choice.svg";
import {useState, useEffect} from 'react';
import Axios from "axios"
import {useParams} from 'react-router-dom';
import useSWR from "swr";



export default function Setlock (){

const {id} = useParams();
const navigate = useNavigate();
const [lockValue, setLockValue] = useState("")
const [quizLive, setQuizLive] = useState(true);
const [choiceLive, setChoiceLive] = useState(true);
const [passLive, setPassLive] = useState(true);
const [user, setUser] = useState(undefined);


const timeValue = ()=>{
        let newDate = new Date();
         let hrs = newDate.getHours();
         let mins = newDate.getMinutes();
         if (mins <= 9){
           mins = "0" + mins;
         }
        let today = newDate.getDate();
        let month = newDate.getMonth();
          
         let kryptTime = `${hrs}:${mins}`
         let kryptDate = `${today}, ${month}`
      
         return {kryptDate, kryptTime}
      
}

const fetcher = (...args) => fetch(...args).then(res => res.json())
const { data, error } = useSWR(`https://sleepy-escarpment-55626.herokuapp.com/setlock/${id}`, fetcher)

useEffect(() => { 
       const token = localStorage.getItem("jwt")
       if (!token){
            navigate("/")
       } else {
        const userid = localStorage.getItem("user")
        setUser(userid)
       }
},[])    

    
<<<<<<< HEAD

=======
const fetcher = (...args) => fetch(...args).then(res => res.json())
const { data, error } = useSWR(`https://sleepy-escarpment-55626.herokuapp.com/setlock/${id}`, fetcher)
console.log(data)
>>>>>>> ca05fe09cc8a8817b52815107effc9eb92d8458d

if (error) return <div>failed to load</div>
if (!data) return <div>loading...</div>

const handleSubmit = e => { 
    const date = timeValue().kryptDate  
    const time = timeValue().kryptTime
    const payload = {lockValue, date, time}
    console.log(payload);
    Axios.post(`https://sleepy-escarpment-55626.herokuapp.com/setlock/${id}`, payload)
    .then(res => {
        console.log(res);
        const next = res.data.lockkrypt.type;
        if(next === "quiz"){
            navigate(`/quiz/${id}`)
        } else if (next === "passcode") {
            navigate(`/passcode/${id}`)
        } else if (next === "multiple"){
            navigate(`/choice/${id}`)
        }
      }).catch(error => {
          console.log(error);
      })

}

const handleClick = e => {
  setLockValue(e.target.value)
  if (e.target.value === "quiz"){
     setQuizLive(false)
     setPassLive(true)
     setChoiceLive(true)
  } else if (e.target.value === "passcode"){
    setQuizLive(true)
    setPassLive(false)
    setChoiceLive(true)
 }
 else if (e.target.value === "multiple"){
    setQuizLive(true)
    setPassLive(true)
    setChoiceLive(false)   
 }

}

const navcolor = {
        home:"fill-secondary-900",
        notification:"fill-secondary-900",
        profile:"fill-secondary-900",
        search:"fill-secondary-900"
}

  

    
    return (
        <div className="page">
            <Header />
            <section className="flex flex-col items-center pt-40">
           
          <button value="passcode"  className={passLive ? "lock-bttn bg-primary text-white" : "lock-bttn border-2 border-white shadow "}  onClick={handleClick}>
            <Password />
            <button value="passcode" onClick={handleClick} className="self-center ml-4">Passcode</button>
          </button>
          

        <button value="quiz" className={quizLive ? "lock-bttn bg-primary text-white" : "lock-bttn border-2 border-white shadow "} onClick={handleClick}>
            <Quiz />
            <button value="quiz" className="self-center ml-4" onClick={handleClick}>Quiz</button>
        </button>
       
        <button value="multiple"  className={choiceLive ? "lock-bttn bg-primary text-white" : "lock-bttn border-2 border-white shadow "} onClick={handleClick}>
           <Choices />
          <button className="self-center ml-4" value="multiple" onClick={handleClick}>Multiple Choice Questions</button>
        </button>

        
        <button onClick={handleSubmit} className="mt-2 shadow border-1 sub-bttn"> 
              next
             </button>
       

      
            </section>
         
            <Nav
             home={navcolor.home}
                notification={navcolor.notification}
                profile={navcolor.profile} 
                search={navcolor.search}
                user={user}
                />
        </div>
    )
}
