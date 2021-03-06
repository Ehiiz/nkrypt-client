import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import Share from "../macro-components/Share";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect,  useState} from "react"



export default function Success(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [user, setUser] = useState("")


  useEffect(()=>{
    const token = localStorage.getItem("jwt")
    const userid = localStorage.getItem("user")
    setUser(userid)
    if (!token){
        navigate("/")
    }


  },[])



  
  
  

   
 
    const navcolor = {
        home:"fill-secondary-900",
        notification:"fill-secondary-900",
        profile:"fill-secondary-900",
        search:"fill-secondary-900",
    }

    
    
    return(
        <div className="page">
            <Header />
            <section className="flex flex-col items-center mt-48">
            <div className="suc-box">
            <p className="text-white text-sm  mb-4">You have successfully created a Krypt, share to get your friends to engage</p>
        <p className="text-secondary-400 w-fit break-all italic underline font-light text-xs">{`https://nkrypt.vercel.app/krypt/${id}`}</p>
         <div className="mt-8">
         <Share />

         </div>
        
            </div>

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
