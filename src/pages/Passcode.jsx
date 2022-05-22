import { Link, useNavigate, useParams} from "react-router-dom";
import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import Passcode from "../macro-components/Passcode";
import {ReactComponent as Key} from "../svg/carbon_password.svg"
import {useState, useEffect} from 'react';
import Axios from "axios";

export default function Passcodepage(){
    const {id} = useParams();
    const navigate = useNavigate();

    const [passCell, setPassCell] = useState({answer:""})
    const [user, setUser] = useState({})

    const updatePass = (e) => {
        const {name, value} = e.target;
        setPassCell({[name]:value});
    } 

    useEffect(() => {
        Axios.get(`/passcode/${id}`)
        .then((res)=>{
            setUser({...res.data.user})
        })
        .catch((err) => {
            console.log(err);
        })
        .then(() => {})


    }
    ,[])

    const sendData = () => {
        const finalCell = [passCell]
        const payload = {finalCell}
        console.log(passCell);
        console.log(payload);
        Axios.post(`/passcode/${id}`, payload)
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
        home:"fill-primary",
        notification:"fill-secondary-900",
        profile:"fill-secondary-900",
    }

    console.log(passCell);

    return(
       
        <div className="page">
        <Header />
        <Passcode
         passCell = {passCell}
         updatePass={updatePass}
         />
        <button onClick={handleSubmit} className="mt-20 w-fit border-4 border-white text-secondary-500 bg-secondary-100 rounded-full py-4 px-4 font-bold flex"> 
            <Key />
               Set Passcode
           </button>
        <Nav 
                home={navcolor.home}
                notification={navcolor.notification}
                profile={navcolor.profile}
                user={user._id}

        />

        </div>
    )
}