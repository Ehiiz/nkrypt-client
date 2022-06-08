import { useState, useEffect } from "react";
import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import Questions from "../macro-components/Questions";
import {useNavigate, useParams} from "react-router-dom";
import {ReactComponent as Add} from "../svg/carbon_add-filled.svg"
import Axios from "axios";
import Bio from "../modals/Bio"


export default function Quizpage(){

const {id} = useParams();
const navigate = useNavigate();


const [questionBox, setQuestionBox] = useState([{question: "", answer:""}])
const [user, setUser] = useState({})
const [kryptbio, setKryptbio] = useState("")
const [modal, setModal] = useState(false)


useEffect(() => {
  Axios.get(`/quiz/${id}`)
  .then((res)=>{
    if (res.data.status === "not signed in") {
      navigate("/")
    } else {
      setUser({...res.data.user})
    }
      
  })
  .catch((err) => {
    console.log(err)
  })
  .then(()=>{})


}
,[])


const navcolor = {
    home:"fill-secondary-900",
    notification:"fill-secondary-900",
    profile:"fill-secondary-900",
}

const addQuestion = () => {
      if (questionBox.length <= 3){
        setQuestionBox([...questionBox, {question:"", answer:""}])
      }
      console.log("max question")
}

const removeQuestion = (i) => {
  let newQuestionBox = [...questionBox];
  newQuestionBox.splice(i,1);
setQuestionBox(newQuestionBox)
}


const bioChange = (e) =>{
  setKryptbio(e.target.value)
}

const handleChange = (i,e) =>{
      let newQuestionBox = [...questionBox];
      newQuestionBox[i][e.target.name] = e.target.value;
      setQuestionBox(newQuestionBox)
      console.log(questionBox)
}




      
const sendData = () => {
  const payload = {questionBox, kryptbio}
  console.log(questionBox);
  console.log(payload);
  Axios.post(`/quiz/${id}`, payload)
.then(res => {
        console.log(res);
        const status = res.data.status;
        if (status === "success"){
            navigate(`/share/${id}`)
            }
            else{
               window.location.reload();
            }
    }).catch(error => {
        console.log(error);
    })
}

const openModal = () =>{
  if(questionBox[0].question === ""){
    return alert("Please create set quiz before submitting")
  } else {
    setModal(true)
  }
  
}

const closeModal = () => {
  setModal(false)
}

const handleSubmit = () =>{
  sendData();
}

    return(
        
        <div className="page">
         {modal && <Bio 
          kryptbio={kryptbio}
          bioChange= {bioChange}
          handleSubmit={handleSubmit}
          closeModal= {closeModal}
        />}
        <Header />
        <section className="flex flex-col bg-secondary-600 pt-20 w-full items-center px-4 pb-24">
        <div id="q-box" className="w-full flex flex-col items-center">
        {questionBox.map((question, index) => (
        <section key={index} className="w-full text-white bg-secondary-600 flex flex-col black pt-16 px-4">
        <p className="multi-num">{index+1}</p>
        <div className="flex flex-col">
        <input className="quest shadow-md" type="text" name= "question" placeholder="Type in your question" 
        value={question.question} 
        onChange={e => handleChange(index, e)}/>
        <label className="self-end pr-2" htmlFor="ques">Question</label>
        </div>
        <div className="flex flex-col">
        <input className="quest mt-3" type="text" name="answer" placeholder="Type in your answer" 
        value={question.answer} onChange={e => handleChange(index, e)}/>
        <label className="self-end pr-2" htmlFor="ans">Answer</label>
        </div>
        {
          index ? <button type="button" onClick={()=> removeQuestion(index)}>Remove</button>
          : null
        }
        </section>
        ))}
        </div>


        <div onClick={addQuestion}>

        <Add  />
      
        </div>
      

        <button onClick={openModal} className="sub-bttn"> 
         Submit
        </button>
        </section>
      
        <Nav 
              home={navcolor.home}
                notification={navcolor.notification}
                profile={navcolor.profile}
                search={navcolor.search}
                user={user._id}
        />
       
        </div>
    )
}