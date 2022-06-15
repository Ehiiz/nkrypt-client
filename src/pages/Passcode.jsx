import { Link, useNavigate, useParams} from "react-router-dom";
import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import Passcode from "../macro-components/Passcode";
import {ReactComponent as Key} from "../svg/carbon_password.svg"
import {useState, useEffect} from 'react';
import Axios from "axios";
import Bio from "../modals/Bio"

export default function Passcodepage(){
    const {id} = useParams();
    const navigate = useNavigate();

const [passCell, setPassCell] = useState({answer:""})
const [user, setUser] = useState(undefined)
const [kryptbio, setKryptbio] = useState("")
const [modal, setModal] = useState(false)

const updatePass = (e) => {
        const {name, value} = e.target;
        setPassCell({[name]:value});
} 

useEffect(() => {
const token = localStorage.getItem("jwt")
if(!token){
    navigate("/")
}     else {
    const userid = localStorage.getItem("user")
    setUser(userid)
}
    
},[])

const openModal = () =>{
    if(passCell.answer === ""){
        alert("Please enter a passcode before proceeding")
    } else {
        setModal(true)
    }
        
}

const closeModal = ()=>{
    setModal(false)
}

const bioChange = (e) =>{
        setKryptbio(e.target.value)
}
      

const sendData = () => {
    const userid = localStorage.getItem("user")
        const finalCell = [passCell]
        const payload = {finalCell, kryptbio, userid}
        console.log(passCell);
        console.log(payload);
        Axios.post(`https://sleepy-escarpment-55626.herokuapp.com/passcode/${id}`, payload)
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

const handleSubmit = () => {
        sendData()

}


    
const navcolor = {
    home:"fill-secondary-900",
    notification:"fill-secondary-900",
    profile:"fill-secondary-900",
    search:"fill-secondary-900"
}

console.log(passCell);
console.log(kryptbio)

return(
       
        <div className="page">
        {modal && <Bio 
          kryptbio={kryptbio}
          bioChange= {bioChange}
          handleSubmit= {handleSubmit}
          closeModal= {closeModal}
        />}
        <Header />
        <Passcode
         passCell = {passCell}
         updatePass={updatePass}
         />
        <button onClick={openModal} className="mt-20 w-fit border-4 border-white text-secondary-500 bg-secondary-100 rounded-full py-4 px-4 font-bold flex"> 
            <Key />
               Set Passcode
           </button>
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
