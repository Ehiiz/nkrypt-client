import Axios from 'axios';
import {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom"
import Header from '../core-components/Header';
import Nav from '../core-components/Nav';
import ProfileSix from "../img/Rectangle 47.png";


export default function Followers(){

 const {id} = useParams();
   
const [userfollowers, setUserFollowers] = useState([])
const [user, setUser] = useState({})
const [profollowers, setProfollowers] = useState([])

   useEffect(() => {
    Axios.get(`/followers/${id}`)
    .then(res =>{
        console.log(res);
        console.log(res.data.followers.followers);
        console.log(res.data.profileFollowers.followers)
        setUserFollowers(res.data.followers.followers)
        setProfollowers(res.data.profileFollowers.followers)
        setUser(res.data.followers)
    })



   },[])

   console.log(profollowers)
   console.log(userfollowers)
   
    const navcolor = {
        home:"fill-secondary-900",
        notification:"fill-secondary-900",
        profile:"fill-secondary-900",
    }

    const followers = "Followers"
    return (
        <div>
            <div className="h-screen scrollbar-hide bg-secondary-600">
        <Header 
            title={followers}
        />
        <div className="h-fit bg-secondary-600 mt-16 flex w-full flex-col items-center">
        {profollowers.map(usefollow=>{
           return <div className="pt-1 flex items-center justify-between pb-2 w-full px-2 bg-secondary-600"> 
                     <div>
                         <div className="py-1">
                         <img src={ProfileSix} alt="dp" className="w-12 rounded-full border-2 border-white" />
                         </div>
                         <p className="text-sm text-secondary-400">{usefollow.follower.username}</p>
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