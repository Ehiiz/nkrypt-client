import Axios from 'axios';
import {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom"
import Header from '../core-components/Header';
import Nav from '../core-components/Nav';
import ProfileSix from "../img/Rectangle 47.png";

export default function Following(){

const {id} = useParams();
const [user, setUser] = useState({})
const [profollowing, setProfollowing] = useState([])

   useEffect(() => {
    Axios.get(`/following/${id}`)
    .then(res =>{
        console.log(res);
        const profollowing = res.data.profollowing;
        const usefollowingID = res.data.usefollowingID;
        const usefollowersID = res.data.usefollowersID;
    const newarray =   profollowing.reduce((r,i)=>{
            if(usefollowingID.includes(i.following._id)){
                console.log("match")
                return [...r, {following:{...i.following, following_status:true}}]
            } else {
                console.log("no match")
                return [...r, {following:{...i.following, following_status:false}}]
            }
        },[])
    const finalfollowing = newarray.reduce((r,i)=>{
        if(usefollowersID.includes(i.following._id)){
            console.log("follower match")
            return [...r, {following:{...i.following, follower_status:true}}]
        } else {
            console.log("follower no match")
            return [...r, {following:{...i.following, follower_status:false}}]
        }
    },[])
        setProfollowing([...finalfollowing])
        setUser(res.data.following)
    })



   },[])

   console.log(profollowing)
   
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
                         <p className="text-sm text-secondary-400"><Link to={`/profile/${usefollow.following._id}`}>{usefollow.following.username}</Link></p>
                        {usefollow.following.follower_status && <p className="text-xs text-secondary-700 ml-1 pt-1">follows you</p>} 
                     </div>
                     <div>
                     {usefollow.following.following_status ? <p className="profi4">Following</p> : <p className="profi3">Follow</p> }
                     
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