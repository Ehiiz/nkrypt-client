import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import Share from "../macro-components/Share";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect,  useState} from "react"
import Axios from 'axios';


export default function Success(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        Axios.get(`/share/${id}`)
        .then((response) =>{
            if (response.data.status === "not signed in") {
                navigate("/")
            } else {
                setUser({...response.data.user})
            }
          
        })
        .catch((error) =>{
            console.log(error);
        })
        .then(()=>{   })



    },[])
   
 
    const navcolor = {
        home:"fill-primary",
        notification:"fill-secondary-900",
        profile:"fill-secondary-900",
    }

    
    
    return(
        <div className="page">
            <Header />
            <section className="flex flex-col items-center mt-48">
            <div className="suc-box">
            <p className="text-white text-sm mb-4">You have successfully created a Krypt, share to get your friends to engage</p>
        <p className="text-secondary-400 italic underline font-light text-xs">{`localhost:3000/${id}`}</p>
         <div className="mt-8">
         <Share />

         </div>
        
            </div>

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