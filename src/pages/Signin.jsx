import {Link} from "react-router-dom";
import Socials from "../macro-components/Socials";
import Axios from "axios";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import Forgot from "../modals/Forgot";

export default function Signin(){

    const [signDetail, setSignDetail] = useState({email:"", password:""})
    const [message, setMessage] = useState("")
    const [modalCase, setModalCase] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
    const loggeduser = localStorage.getItem("jwt")
    console.log(loggeduser)
        if(loggeduser){
            navigate("/home")
        } else {

        }
  

    },[])
    

    const handleChange = e =>{
        const {name, value} = e.target
        setSignDetail({...signDetail, [name]:value})
    }

    const handleSubmit = e =>{
        const {email, password} = signDetail
        
        const payload = {                         
            signinData: {email, password}
        }
        console.log(payload)
    
    
        //Data Posting Function
        Axios.post('/', payload)
            .then(res => {
                console.log(res)
                console.log(res.data);
                console.log(res.data.status)
                const status = res.data.status;
                if (status === "success"){
                    const { token } = res.data;
                    localStorage.setItem('jwt', token);
                    navigate('/home')
                }
                else if (status === "failure"){
                   setSignDetail({email:"", password:""})
                   setMessage("User does not exist")
                    setTimeout(()=>{
                        setMessage("")
                    
                    }, 5000) 
                }
            }).catch(error => {
                console.log(error);

            })
    

    }                  
  
    const forgotPassword = ()=>{
        setModalCase(!modalCase)
    }

    const closeModal = () => {
        setModalCase(false)
      }

    return(
        <div className="signed">
         {modalCase && <Forgot 
             closeModal={closeModal}
         />}
        <section className="mb-8 mt-8 self-left">
            <p className="text-xl text-white font-bold mb-0">Share</p>
            <p className="text-xl text-white font-bold mb-0 mt-0">Socialize</p>
            <h2 className="text-5xl text-secondary-100 font-bold">Krypt</h2>
            <p className="text-white text-xs font-light italic mt-2">a new way to engage</p>
        </section>


        <section className="flex justify-between mt-8">
            <button className="active">
            <Link to="/"> Login</Link>
            </button>
            <button className="dormant"><Link to="/signup">Signup</Link></button>
        </section>

      
        
        <form className="mt-8 self-center w-full">
        <div className="w-full mb-4">
            <input 
            className="form" 
            type="text" 
            name="email" 
            placeholder="Jaycass50@gmail.com" 
            onChange={handleChange}
            value={signDetail.email}
            />
            <label className="text-sm block text-white" htmlFor="">email</label>
        </div>
        <div className="w-full mb-4">
            <input 
            className="form" 
            name="password" 
            type="password" 
            placeholder="********" 
            onChange={handleChange}
            value={signDetail.password}
            />
            <label className="text-sm block text-white" htmlFor="">password</label>
        </div>
        <p className="text-sm block cursor-pointer text-secondary-700" onClick={forgotPassword}>Forgot Password</p>
        </form>
        <p className="self-center text-secondary-700 text-xl">{message}</p>

       <button onClick={handleSubmit} className="landing-bttn self-center mt-4 mb-16">
        Login
       </button>
      
    
        <section className="self-center mb-4">
        <Socials />
        </section>
    
        </div>
        
    )
}