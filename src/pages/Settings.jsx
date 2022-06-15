import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import {ReactComponent as Edit} from '../svg/bx_edit.svg'
import Axios from 'axios';
import { useNavigate, Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Updatebio from "../modals/Updatebio";
import useSWR from "swr";
import Fetching from "../modals/Fetching"

export default function Settings(){

    const navigate = useNavigate();

    const [profileData, setProfileData] = useState({})
    const [newPassword, setNewPassword] = useState("")
    const [passwordInput, setPasswordInput] = useState(false)
    const [newPasswordInput, setNewPasswordInput] = useState(false)
    const [nextPassword, setNextPassword] = useState("")
    const [userAdd, setUserAdd] = useState("")
    const [message, setMessage] = useState("")
    const [user, setUser] = useState(undefined)
    const [updatebio, setUpdatebio] = useState(false)
    const [newRender, setNewRender] = useState(false)

//Function for bio update
    const [userbio, setUserBio] = useState("")
    const [biomessage, setBioMessage] = useState("")
    

    useEffect(()=>{
        const token = localStorage.getItem("jwt")
        const userid = localStorage.getItem("user")
        setUser(userid)
        if (!token){
            navigate("/")
        } else {
            const payload = {userid}
          Axios.post("https://sleepy-escarpment-55626.herokuapp.com/settings", payload)
          .then(response =>{
            setUserAdd(response.data.data.username)
          })
        }
    },[newRender])


   

    //Helper functions
    function truncateString(string, limit) {
        if (string.length > limit) {
          return string.substring(0, limit)
        } else {
          return string
        }
      }


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
        const userid = localStorage.getItem("user")
        const payload = {
            newPassword, userid
        }
       Axios.post("https://sleepy-escarpment-55626.herokuapp.com/checkpassword", payload)
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
        const userid = localStorage.getItem("user")
        const payload = {
            nextPassword, userid
        }
       Axios.post("https://sleepy-escarpment-55626.herokuapp.com/changepassword", payload)
       .then((res) => {
           console.log(res)
           const status = res.data.status
           if (status === "success") {
            console.log("Password successfully changed")
            setNewPasswordInput(false)
           }
       })
    }

    //Funcions For Username Change
    const handleUserValue = () =>{
        setUserAdd("")
    }

    const handleUserSubmit = e =>{
        const userid = localStorage.getItem("user")
         const payload = {userAdd, userid}
        Axios.post("https://sleepy-escarpment-55626.herokuapp.com/setusername", payload)
        .then((response) => {
            console.log(response)
            const status = response.data.status;
            if (status === "success"){
                setMessage("username successfully updated")
                setTimeout(()=>{
                  setMessage("")}, 2000) 
                setNewRender(!newRender)
            } else {
                setMessage("invalid username, try again")
                setNewRender(!newRender)
            }
        })
        .catch (err => {
            console.log(err)
        })
        .then(() =>{})

    }

    
    const userCheck =(data)=>{
        const userid = localStorage.getItem("user")
        const payload = {data, userid}
        console.log(payload)
        Axios.post("https://sleepy-escarpment-55626.herokuapp.com/checkuser", payload)
        .then(res=>{
            console.log(res)
            const status = res.data.status
            if(status === "success"){
                setMessage("username available")
            } else {
                setMessage("username already taken")
            
            }
        })
    
    }

    const nameChange = (e)=>{
        setUserAdd(truncateString(e.target.value, 12))
        if (e.target.value === 12){
            setMessage("username cannot exceed 15 characters")
        }
        if (e.target.value.length < 4){
            setMessage("username must be more than 4 characters")
        } else {
            setMessage("")
            const username = e.target.value
            console.log(username)
            userCheck(username)
        }
    }
    //username function ends here


    //Function for Userbio Starts
    const userbioSubmit = ()=>{
        const userid = localStorage.getItem("user")
        const payload = {userbio, userid}
        Axios.post("https://sleepy-escarpment-55626.herokuapp.com/setuserbio", payload)
        .then(res=>{
            console.log(res)
            const status = res.data.status
            if (status === "success"){
                setBioMessage("Your bio has been updated successfully.")
               setTimeout(()=>{setBioMessage("");
                            setUpdatebio(false)}, 3000) 
            } else {
                setBioMessage("error creating username")
            }
        })
    }
  
    const bioChange = (e)=>{
        setUserBio(e.target.value)
    }
 
    const closeModal = () => {
        setUpdatebio(false)
      }

      const openModal = () => {
          setUpdatebio(true)
      }


//Logout Function
    const logOut = ()=>{
      localStorage.removeItem("jwt")
      localStorage.removeItem("user")
      navigate('/')
}

    const settings = "Settings"

    const navcolor = {
        home:"fill-secondary-900",
        notification:"fill-secondary-900",
        profile:"fill-primary",
        search:"fill-secondary-900"
    }


    return (
        <div className="bg-secondary-600 w-full h-screen">
         <Header 
             title = {settings}
         />
         
         
         {updatebio && <Updatebio
           userbioSubmit={userbioSubmit}
           bioChange= {bioChange}
           userbio={userbio}
           biomessage={biomessage}
           closeModal= {closeModal}
            />}

         <section className="flex flex-col bg-secondary-600 pt-36 w-full items-center px-8 pb-24">
         <Link to="/drafts" className="text-secondary-700 text-lg self-start">Drafts</Link>
         <div className="flex justify-between pt-12 w-full">
             <input onChange={nameChange} className="text-secondary-400 bg-inherit rounded-sm border-x-0 border-t-0 placeholder:text-gray-500 placeholder:text-sm active:border-secondary-800 active:border-y-0" value={userAdd}/>
         
            <span onClick={handleUserValue}>
            <Edit />
            </span>   
         </div>
             <hr className="text-white border-1 px-4 border-white w-full rounded-full"/>
             <p className="text-secondary-700 text-xs text-center py-2">{message}</p>
             <button className="text-white py-2 px-4 bg-secondary-500 rounded-xl self-end" onClick={handleUserSubmit}>Submit</button>
             <button className="text-secondary-500 text-lg self-start bg-secondary-800 py-2 px-4 rounded-xl font-semibold mt-4" onClick={openModal}>Edit Bio</button>
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


         
             <button className="text-secondary-500 text-xl mt-12 self-start py-2 px-4 bg-secondary-800 rounded-xl font-semibold" onClick={handlePasswordChange}>Reset Password</button>
             <button className="text-white rounded-2xl py-2 px-2 bg-primary text-xl mt-10" onClick={logOut}> Logout</button>
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
