import Axios from 'axios';
import {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom"
import Header from '../core-components/Header';
import Nav from '../core-components/Nav';
import ProfileSix from "../img/Rectangle 47.png";

export default function Following(){

const {id} = useParams();
   
const [userfollowing, setUserFollowing] = useState([])
const [user, setUser] = useState({})
const [profollowing, setProfollowing] = useState([])

   useEffect(() => {
    Axios.get(`/following/${id}`)
    .then(res =>{
        console.log(res);
        console.log(res.data.following.following);
        console.log(res.data.profileFollowing.following)
        setUserFollowing(res.data.following.following)
        setProfollowing(res.data.profileFollowing.following)
        setUser(res.data.following)
    })



   },[])

   console.log(userfollowing)
   
    const navcolor = {
        home:"fill-secondary-900",
        notification:"fill-secondary-900",
        profile:"fill-secondary-900",
    }

    const following = "Following"
    return (
        <div>
            <div className="h-screen scrollbar-hide bg-secondary-600">
        <Header 
            title={following}
        />
        <div className="h-fit bg-secondary-600 mt-16">
        {profollowing.map(usefollow=>{
           return <div className="pt-1 flex items-center justify-between pb-2 w-full px-2 bg-secondary-600"> 
                     <div>
                         <div className="py-1">
                         <img src={ProfileSix} alt="dp" className="w-12 rounded-full border-2 border-white" />
                         </div>
                         <p className="text-sm text-secondary-400">{usefollow.following.username}</p>
                     </div>
                     <div>
                     <p className="profi3">Follow</p>
                     </div>
                    
                </div>
        })}
      

        </div>

        
        <Nav 
            home={navcolor.home}
            notification={navcolor.notification}
            profile={navcolor.profile}
            user={user._id}
        />


        </div>
        </div>
    )

}