import Axios from 'axios';
import {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom"
import Header from '../core-components/Header';
import Nav from '../core-components/Nav';
import ProfileSix from "../img/Rectangle 47.png";
import FollowBttn from '../micro-components/FollowBttn';


export default function Followers(){

 const {id} = useParams();

const [user, setUser] = useState({})
const [profollowers, setProfollowers] = useState([])
const [newRender, setNewRender] = useState(true)

   useEffect(() => {
    Axios.get(`/followers/${id}`)
    .then(res =>{
        console.log(res);
        const profollowers = res.data.profollowers;
        const usefollowingID = res.data.usefollowingID;
        const usefollowersID = res.data.usefollowersID;
    const newarray =   profollowers.reduce((r,i)=>{
            if(usefollowingID.includes(i.follower._id)){
                console.log("match")
                return [...r, {follower:{...i.follower, following_status:true}}]
            } else {
                console.log("no match")
                return [...r, {follower:{...i.follower, following_status:false}}]
            }
        },[])

    const finalfollowing = newarray.reduce((r,i)=>{
        console.log(i)
        if(usefollowersID.includes(i.follower._id)){
            console.log("follower match")
            return [...r, {follower:{...i.follower, follower_status:true}}]
        } else {
            console.log("follower no match")
            return [...r, {follower:{...i.follower, follower_status:false}}]
        }
    },[])

        const finalFollowing = finalfollowing.reverse()
        setProfollowers([...finalFollowing])
        setUser(res.data.following)
    })
 
   },[newRender])


const checkClick =(e)=>{
    let proid = e.target.value;
    let followstate = e.target.name;
    
    
    const payload = {
        proid
    }

    if(followstate === "true"){
        Axios.post('/unfollow', payload)
        .then((response) =>{
            console.log(response)
        })
        .catch((err) =>{
            console.log(err)
        })
        .then(()=>{})
        if(newRender){
            setNewRender(false)
        } else {
            setNewRender(true)
        }

    } else if (followstate === "false") {
        Axios.post('/follow', payload)
        .then((response) =>{
            console.log(response)
        })
        .catch((err) =>{
            console.log(err)
        })
        .then(()=>{})
        if(newRender){
            setNewRender(false)
        } else {
            setNewRender(true)
        }

    }
    console.log(e.target.value)
    console.log(e.target.name)
}
   
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
        <div className="h-fit bg-secondary-600 pb-20 mt-16 flex w-full flex-col items-center">
        {profollowers.map(usefollow=>{
           return <div className="pt-1 flex items-center justify-between pb-2 w-full px-2 bg-secondary-600"> 
                     <div>
                         <div className="py-1">
                         <img src={ProfileSix} alt="dp" className="w-12 rounded-full border-2 border-white" />
                         </div>
                         <p className="text-sm text-secondary-400"><Link to={`/profile/${usefollow.follower._id}`}>{usefollow.follower.username}</Link></p>
                         {usefollow.follower.follower_status && <p className="text-xs text-secondary-700 ml-1 pt-1">follows you</p>} 
                     </div>
                     <div>
                     <FollowBttn 
                         following_status={usefollow.follower.following_status}
                         id={usefollow.follower._id}
                         checkClick={checkClick}
                     />
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