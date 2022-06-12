import {Link} from "react-router-dom";
import Socials from "../macro-components/Socials";
import { useEffect, useState } from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom"
import Userpic from "../modals/Userpic";
import Username from "../modals/Username";
import Userbio from "../modals/Userbio";


export default function Signup(){

    const navigate = useNavigate();
    //Modal Management
    const [modalCase, setModalcase] = useState(false)
    const [nameCase, setNameCase] = useState(false)
    const [bioCase, setBioCase] = useState(false)

    //Form State Management
    const [userDetail, setUserDetail] = useState({username:"", email:"", password:"", verify:""})

    //Username State Management
    const [userAdd, setUserAdd] = useState("")
    const [message, setMessage] = useState("")
    const [bttnLive, setBttnLive] = useState(false)

    //Userbio State Management
    const [userbio, setUserBio] = useState("")
    const [biomessage, setBioMessage] = useState("")
    const [bttnLive2, setBttnLive2] = useState(false)


    //Email Validation States
    const [passEmail, setPassEmail] = useState(false);
    const [emailExist, setEmailExist] = useState(false);


    //Password Validation States
    const [passLength, setPassLength] = useState(false);
    const [passError, setPassError] = useState(false);
    const [passUpper, setPassUpper] = useState(false);
    const [passLower, setPassLower] = useState(false);
    const [passSpecial, setPassSpecial] = useState(false);
    const [passDigit, setPassDigit] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);


    //Button Validation
    const [popError, setPopError] = useState("")


    function truncateString(string, limit) {
        if (string.length > limit) {
          return string.substring(0, limit)
        } else {
          return string
        }
      }
    
      
     //Data Posting Function
     useEffect(() => {
        const loggeduser = localStorage.getItem("jwt")
        console.log(loggeduser) 
        if(loggeduser){
                navigate("/home")
            } else {
                
            }
    
        },[])

    const createImage = (e)=>{
        const {src} = e.target
        console.log(src)
        const payload = {src}
        Axios.post('https://sleepy-escarpment-55626.herokuapp.com/setprofilepic', payload)
        .then(res=>{
            console.log(res)
            const status = res.data.status
            if(status === "success"){
                setNameCase(true)
            } else if(status === "failure"){
                alert("error setting profile image")
            }
        })
        .catch(err=>{
            console.log(err)
        })
        .then(()=>{})
        
        }

    //Submit Function
    const handleSubmit = e => {
        const { password, email, verify} = userDetail;
     
            if(password !== ""){
                if(email !== ""){
                    if(verify !== ""){
                        if (passEmail === false){
                            if (passLength === false){
                             if(passError === false){
                                 if(passUpper === false){
                                     if(passLower === false){
                                         if(passSpecial === false){
                                             if(passDigit === false){
                                                 if(errorMessage === false){
                                                     console.log("Baba na master")  
                                    const payload = {
                                        userData: {email, password}
                                    }
                                    //Data Posting Function
                                    Axios.post('https://sleepy-escarpment-55626.herokuapp.com/signup', payload)
                                    .then(res => {
                                            console.log(res);
                                            const status = res.data.status;
                                            console.log(res.data)
                                           
                                            console.log(status)
                                            if (status === "success"){
                                                const { token } = res.data;
                                                localStorage.setItem('jwt', token);
                                                setModalcase(true)
                                                // navigate('/home')
                                                }
                                                else{
                                                    // navigate('/signin')
                                                    alert("Error creating account. Try again")
                                                    window.location.reload()
                                                }
                                        }).catch(error => {
                                            console.log(error);
                                            alert("Error creating account. Try again")
                                            window.location.reload()
                                        })
                                                 } 
                                             } 
                                         }
                                     }
                                 }
                             } 
                            }
                        }
                    }else{
                        setPopError("Kindly check your details")
                    }
        
                }else{
                    setPopError("Kindly fill your details")
                }
    
            }else{
                setPopError("Kindly fill your details")
            }

        


  
       
        e.preventDefault();

    



    }
    
    const handleChange = (e) =>{
            setUserDetail({...userDetail, [e.target.name]: e.target.value})         
        
      
        
        if(e.target.name === "verify"){
            if(e.target.value !== userDetail.password){
                setPassError(true);
            }
            else if(e.target.value === userDetail.password){
                setPassError(false);
            }
        }
        
        if(e.target.name === "email"){
            // usersDeets.map(userDeet =>{
            //     if (userDeet.email === e.target.value){
            //         setEmailExist(true)
            //     }
            //     else {
            //         setEmailExist(false)
            //     }
            // })

            const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            const emailValidator = regex.test(e.target.value)
            if(!emailValidator){
                setPassEmail(true)
            } else {
                setPassEmail(false)
            }

        }

        else if(e.target.name === "password"){
            const uppercaseRegExp   = /(?=.*?[A-Z])/;
            const lowercaseRegExp   = /(?=.*?[a-z])/;
            const digitsRegExp      = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-.,])/;
            const minLengthRegExp   = /.{10,}/;

            const passwordInputValue = e.target.value
            const passwordLength =      passwordInputValue.length;
            const uppercasePassword =   uppercaseRegExp.test(passwordInputValue);
            const lowercasePassword =   lowercaseRegExp.test(passwordInputValue);
            const digitsPassword =      digitsRegExp.test(passwordInputValue);
            const specialCharPassword = specialCharRegExp.test(passwordInputValue);
            const minLengthPassword =   minLengthRegExp.test(passwordInputValue);
          
        
            if(passwordLength===0){
                    setPassLength(true)
            }
            else{
                setPassLength(false)
            }
            
            if(!uppercasePassword){
                    setPassUpper(true)
            }
            else{
                setPassUpper(false)
            }
            
            if(!lowercasePassword){
                   setPassLower(true)
            }
            else {
                setPassLower(false)
            }
            
            if(!digitsPassword){
                  setPassDigit(true)
            }
            else{
                setPassDigit(false)
            }
            
            if(!specialCharPassword){
                setPassSpecial(true)
            }
            else{
                setPassSpecial(false)
            }
            if(!minLengthPassword){
                  setErrorMessage(true)
            }
            else {
                setErrorMessage(false)
            }
            



            if(e.target.value !== userDetail.verify){
                setPassError(true);
            }
            else if(e.target.value === userDetail.verify){
                setPassError(false);
            }


        }


    }


    //Functions for Username Modal
    const usernameSubmit =()=>{
        const payload = {userAdd}
        Axios.post("https://sleepy-escarpment-55626.herokuapp.com/setusername", payload)
        .then(res=>{
            console.log(res)
            const status = res.data.status
            if (status === "success"){
                setBioCase(true)
                setNameCase(false)            } 
                else {
                setMessage("error creating username")
            }
        })
    
    }

    const userCheck =(data)=>{
        const payload = {data}
        console.log(payload)
        Axios.post("/checkuser", payload)
        .then(res=>{
            console.log(res)
            const status = res.data.status
            if(status === "success"){
                setBttnLive(true)
                setMessage("username available")
            } else {
                setMessage("username already taken")
                setBttnLive(false)
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

    //Functions for Userbio Modals
    const userbioSubmit = ()=>{
        const payload = {userbio}
        Axios.post("https://sleepy-escarpment-55626.herokuapp.com/setuserbio", payload)
        .then(res=>{
            console.log(res)
            const status = res.data.status
            if (status === "success"){
        navigate("/home")
            } else {
                setBioMessage("error creating username")
            }
        })
    }
  
    const bioChange = (e)=>{
        setUserBio(e.target.value)
    }



    return(
        <div className="signed">
         {modalCase && <Userpic
          createImage={createImage}
          />}
           {bioCase && <Userbio
           userbioSubmit={userbioSubmit}
           bioChange= {bioChange}
           userbio={userbio}
           bttnLive2=  {bttnLive2}
           biomessage={biomessage}
            />}
          {nameCase && <Username
          bttnLive= {bttnLive}
          usernameSubmit= {usernameSubmit}
          userAdd={userAdd}
          nameChange={nameChange}
          message={message}
           />}
         
    
        <section className="mb-8 mt-8 self-left">
            <p className="text-xl text-white font-bold mb-0">Share</p>
            <p className="text-xl text-white font-bold mb-0 mt-0">Socialize</p>
            <h2 className="text-5xl text-secondary-100 font-bold">Krypt</h2>
            <p className="text-white text-xs font-light italic mt-2">a new way to engage</p>
        </section>


        <section className="flex justify-between mt-8">
            <button className="dormant">
           <Link to="/">Login</Link>
            </button>

            <button className="active">
            <Link to="/signup"> Signup</Link>
            </button>
        </section>

      
        
        <form className="mt-8 self-center w-full">
        <div className="w-full mb-4">
            <input 
            className="form" 
            type="text" 
            name="email" 
            placeholder="Jaycass50@gmail.com" 
            onChange={handleChange}
            />
            <label className="text-sm block text-white" htmlFor="">email</label>
            {emailExist && <span className="text-xs block text-secondary-100">email already exists</span>}
            {passEmail && <span className="text-xs block text-secondary-100">enter a valid email</span>}
        </div>
        <div className="w-full mb-4">
            <input 
            className="form" 
            name="password" 
            type="password" 
            placeholder="********" 
            onChange={handleChange}
            // onBlur={handleBlur}
            />
            <label className="text-sm block text-white" htmlFor="">password</label>
            {passError && <span className="text-xs block text-secondary-100">passwords do not match</span>}
            {passLength && <span className="text-xs block text-secondary-100">password cannot be empty</span>}
            {passUpper && <span className="text-xs block text-secondary-100">password must contain
             at least one Uppercase e.g 'A'</span>}
            {passLower && <span className="text-xs block text-secondary-100">password must contain
            at least one lowercase e.g 'b'</span>}
            {passSpecial && <span className="text-xs block text-secondary-100">password must contain
            at least one special character e.g ".,/"</span>}
            {errorMessage && <span className="text-xs block text-secondary-100">must be 
            more than 10 characters</span>}
            {passDigit && <span className="text-xs block text-secondary-100">password contain at least one digit</span>}

        </div>
        <div className="w-full mb-4">
            <input 
            className="form" 
            name="verify" 
            type="password" 
            placeholder="confirm password" 
            onChange={handleChange}
            // onBlur={handleBlur}
            />
            <label className="text-sm block text-white" htmlFor="">confirm password</label>
            {passError && <span className="text-xs text-secondary-100">passwords do not match</span>}
        </div>
        </form>
        
        <span className="text-lg font-bold self-center text-white">{popError}</span>

       <button onClick={handleSubmit}  className= "landing-bttn self-center mt-4 mb-16">Sign Up</button>


        
    
        <section className="self-center mb-4">
        <Socials />
        </section>
    
        </div>
        
    )
}
