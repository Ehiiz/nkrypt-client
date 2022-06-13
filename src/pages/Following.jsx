import Axios from 'axios';
import {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom"
import Header from '../core-components/Header';
import Nav from '../core-components/Nav';
import ProfileSix from "../img/Rectangle 47.png";
import FollowBttn from '../micro-components/FollowBttn';
import {ReactComponent as Pizza} from "../svg/Wavy Buddies Pizza.svg"

export default function Following(){

const {id} = useParams();
const [user, setUser] = useState({})
const [profollowing, setProfollowing] = useState([])
const [newRender, setNewRender] = useState(false)
const [emptyCase, setEmptyCase] = useState(false)

   useEffect(() => {
    Axios.get(`https://sleepy-escarpment-55626.herokuapp.com/following/${id}`)
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
     const finalFollowing = finalfollowing.reverse()
     if(finalFollowing.length === 0){
        setEmptyCase(true)
     } else {
        setEmptyCase(false)
     }
     console.log(finalFollowing)
        setProfollowing([...finalFollowing])
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
        Axios.post('https://sleepy-escarpment-55626.herokuapp.com/unfollow', payload)
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
}
   
    const navcolor = {
        home:"fill-secondary-900",
        notification:"fill-secondary-900",
        profile:"fill-secondary-900",
        search:"fill-secondary-900"
    }

    const following = "Following"
    return (
        <div>
            <div className="h-screen scrollbar-hide bg-secondary-600">
        <Header 
            title={following}
        />
            {emptyCase && <div className="flex items-center pt-24 flex-col mt-12">
          <Pizza />
            
              <p className="text-secondary-700 mt-4 italic">share a pizza with your friends</p>
              <p className="text-secondary-700 italic">you have got none.. yet</p>

          </div>}
        <div className="h-fit bg-secondary-600 pb-20 mt-16">
        {profollowing.map(usefollow=>{
           return <div className="pt-1 flex items-center justify-between pb-2 w-full px-2 bg-secondary-600"> 
                     <div>
                         <div className="py-1">
                         <img src={usefollow.following.image} alt="dp" className="w-12 rounded-full border-2 border-white" />
                         </div>
                         <p className="text-sm text-secondary-400"><Link to={`/profile/${usefollow.following._id}`}>{usefollow.following.username}</Link></p>
                        {usefollow.following.follower_status && <p className="text-xs text-secondary-700 ml-1 pt-1">follows you</p>} 
                     </div>
                     <div>
                     <FollowBttn 
                         following_status={usefollow.following.following_status}
                         id={usefollow.following._id}
                         checkClick={checkClick}
                     />
                     {/* {usefollow.following.following_status ? <button value={`${usefollow.following._id}`} name={`${usefollow.following.following_status}`} onClick={checkClick} className="profi4">Following</button> : <button value={`${usefollow.following._id}`} name={`${usefollow.following.following_status}`} onClick={checkClick} className="profi3">Follow</button> } */}
                     
                     </div>
                    
                </div>
        })}
      

        </div>

        
        <Nav 
            home={navcolor.home}
            notification={navcolor.notification}
            profile={navcolor.profile}
            search={navcolor.search}
            user={"62a374fcafcbd93ed7956d44"}
        />


        </div>
        </div>
    )

}
