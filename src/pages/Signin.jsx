import {Link} from "react-router-dom";
import Socials from "../macro-components/Socials";
import Axios from "axios";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"

export default function Signin(){

    const [signDetail, setSignDetail] = useState({email:"", password:""})

    const navigate = useNavigate();

    

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
                navigate('/home')
                }
                else if (status === "failure"){
                    window.location.reload();
                   navigate('/signup')
                }
            }).catch(error => {
                console.log(error);
            })
    

    }                  
  
    console.log(signDetail)

    return(
        <div className="signed">
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
            />
            <label className="text-sm block text-white" htmlFor="">password</label>
        </div>
        </form>

       <button onClick={handleSubmit} className="landing-bttn self-center mt-4 mb-16">
        Login
       </button>
      
    
        <section className="self-center mb-4">
        <Socials />
        </section>
    
        </div>
        
    )
}