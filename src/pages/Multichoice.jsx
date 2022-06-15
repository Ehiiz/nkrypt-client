import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Header from "../core-components/Header"
import Multi from "../macro-components/Multi"
import Nav from "../core-components/Nav"
import {ReactComponent as Add} from "../svg/carbon_add-filled.svg"
import Axios from 'axios';
import Bio from "../modals/Bio"


export default function Choice(){

const {id} = useParams();
const navigate = useNavigate();

const [multibox, setMultibox] = useState([{question:"", option1:"", option2:"", option3:"", option4:"",  answer:""}])
const [user, setUser] = useState({})
const [kryptbio, setKryptbio] = useState("")
const [modal, setModal] = useState(false)


useEffect(() => {
<<<<<<< HEAD
  const token = localStorage.getItem("jwt")
  if(!token){
    navigate("/")
  } else {
    const userid = localStorage.getItem("user")
    setUser(userid)
  }
 
=======
  Axios.get(`https://sleepy-escarpment-55626.herokuapp.com/choice/${id}`)
  .then((res)=>{
    if (res.data.status === "not signed in"){
      navigate("/")
    } else {
      setUser({...res.data.user})
    }
    })
  .catch((err)=>{
    console.log(err)
  })
  .then(()=>{})

>>>>>>> ca05fe09cc8a8817b52815107effc9eb92d8458d

},[])


const addMulti = () => {
  if(multibox.length <= 3){
    setMultibox([...multibox, {question:"", option1:"", option2:"", option3:"", option4:"", answer:""}])
  } else {
    console.log("max question")
  }
}
  

const sendData = () => {
  const userid = localStorage.getItem("user")
        const payload = {multibox, kryptbio, userid}
        console.log(multibox);
        console.log(payload);
        Axios.post(`https://sleepy-escarpment-55626.herokuapp.com/choice/${id}`, payload)
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

const handleChange = (i,e) =>{
  let newMultibox = [...multibox];
  console.log(e.target.value)
  newMultibox[i][e.target.name] = e.target.value;
  setMultibox(newMultibox)
  console.log(multibox)
}

const openModal = () =>{
 if(multibox[0].question === ""){
  alert("Please enter a valid quiz to proceed")
 } else {
  setModal(true)
 }
  
}

const closeModal = () => {
  setModal(false)
}

const bioChange = (e) =>{
  setKryptbio(e.target.value)
}

const handleSubmit = (e) => {
        sendData();
}

     
const removeQuestion = (i) => {
        let newMultibox = [...multibox];
        newMultibox.splice(i,1);
        setMultibox(newMultibox);
}
  
const navcolor = {
  home:"fill-secondary-900",
  notification:"fill-secondary-900",
  profile:"fill-secondary-900",
  search:"fill-secondary-900"
}


    return (
        <div>
          <div className="page">
        {modal && <Bio 
          kryptbio={kryptbio}
          bioChange= {bioChange}
          handleSubmit= {handleSubmit}
          closeModal= {closeModal}
        />}
        <Header />
        <section className="choice-sec">
        <div className="w-full flex flex-col items-center">
        <h1 className="text-white text-lg">Click on one of the buttons below the options to select an answer</h1>
        {multibox.map((multi, index) => (<Multi
           number = {index + 1}
           index ={index}
           option1={multi.option1}
           option2={multi.option2}
           option3={multi.option3}
           option4={multi.option4}
           answer={multi.answer}
           question={multi.question}
           handleChange={handleChange}
           removeQuestion= {removeQuestion}
        />))}

        </div>

        <div onClick={addMulti}>
        <Add />

        </div>
      

        <button className="sub-bttn" onClick={openModal}> 
         Submit
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
        
        </div>
    )
}
