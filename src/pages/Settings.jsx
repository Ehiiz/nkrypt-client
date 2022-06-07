import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import {ReactComponent as Edit} from '../svg/bx_edit.svg'
import Axios from 'axios';
import { useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

export default function Settings(){

    const navigate = useNavigate();

    const [profileData, setProfileData] = useState({})
    const [newPassword, setNewPassword] = useState("")
    const [passwordInput, setPasswordInput] = useState(false)
    const [newPasswordInput, setNewPasswordInput] = useState(false)
    const [nextPassword, setNextPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [message, setMessage] = useState("")
    const [user, setUser] = useState({})

    useEffect(()=>{
        Axios.get('/settings')
        .then(function(res){
            if (res.data.status === "not signed in"){
                    navigate("/")
            }else {
            const status = res.data.status;
            console.log(status)
            console.log(res)
            setUser({...res.data.user})
            setProfileData({...res.data.data});
            setUserName(res.data.data.username)
            }
          
        })
        .catch(function(error){
            console.log(error);
        })
        .then(function(){
        })

    },[])
   

    const handlePasswordChange = () => {
     if(newPasswordInput === false){
        setPasswordInput(!passwordInput)
     }
    }

    const handleChange = e => {
        const {name, value} = e.target
        setNewPassword(value)
    }

    const handleChange2 = e => {
        const {name, value} = e.target
        setNextPassword(value)
    }
    const handleSubmit = e => {
        const payload = {
            newPassword
        }
       Axios.post("/checkpassword", payload)
       .then((res) => {
           console.log(res)
           const status = res.data.status
           if (status === "password confirmed") {
               setPasswordInput(false)
               setNewPasswordInput(true)
           } else {
               console.log("Password not correct")
           }
       })
    }

    const handleSubmit2 = ()=> {
        const payload = {
            nextPassword
        }
       Axios.post("/changepassword", payload)
       .then((res) => {
           console.log(res)
           const status = res.data.status
           if (status === "success") {
            console.log("Password successfully changed")
            setNewPasswordInput(false)
           }
       })
    }
    const handleUserValue = () =>{
        console.log("clicking")
        setUserName("")
    }

    const handleUserSubmit = e =>{
         const payload = {userName}
        Axios.post("/username", payload)
        .then((response) => {
            console.log(response)
            const status = response.data.status;
            if (status === "success"){
                setMessage("Username successfully updated")
            } else {
                setMessage("Invalid username, try again")
            }
        })
        .catch (err => {
            console.log(err)
        })
        .then(() =>{})

    }

    const handleUsername = e =>{
        const {name, value} = e.target
        setUserName(value)
    }

    const logOut = ()=>{
       
        Axios.get("/logout").then((res) =>{
                console.log(res.data.status)
                const status = res.data.status
                if (status === "success"){
                    localStorage.removeItem("jwt")
                    navigate('/')
                }
        })
    }

    const settings = "Settings"

    const navcolor = {
        home:"fill-secondary-900",
        notification:"fill-secondary-900",
        profile:"fill-primary",
    }


    return (
        <div className="bg-secondary-600 w-full h-screen">
         <Header 
             title = {settings}
         />
         <section className="flex flex-col bg-secondary-600 pt-48 w-full items-center px-8 pb-24">
         <div className="flex justify-between w-full">
             <input onChange={handleUsername} className="text-secondary-400 bg-inherit rounded-sm border-x-0 border-t-0 placeholder:text-gray-500 placeholder:text-sm active:border-secondary-800 active:border-y-0" value={userName}/>
         
            <span onClick={handleUserValue}>
            <Edit />
            </span>   
         </div>
             <hr className="text-white border-1 px-4 border-white w-full rounded-full"/>
             <button className="text-white" onClick={handleUserSubmit}>Submit</button>
             <p>{message}</p>
             {passwordInput && 
                <div className="flex flex-col items-center mt-8">
                <input  className="form" type="text" placeholder="enter old password" onChange={handleChange}/>
                <button className="text-white" onClick={handleSubmit}>Submit</button>
                </div>}
             {newPasswordInput && 
             <div className="flex flex-col items-center mt-8">
                <input className="form" type="text" placeholder="enter new password" onChange={handleChange2}/>
                <button className="text-white" onClick={handleSubmit2}>Submit</button>
                </div>
                } 
             <div className="text-white text-xl mt-12" onClick={handlePasswordChange}>Reset Password</div>
             <button className="text-white rounded-2xl py-2 px-2 bg-primary text-xl mt-10" onClick={logOut}> Logout</button>
         </section>


    
    
         <Nav 
             home={navcolor.home}
             notification={navcolor.notification}
             profile={navcolor.profile}
             user={user._id}
        />

        </div>
     
    )
}