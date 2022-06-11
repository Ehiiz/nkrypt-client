import Header from "../core-components/Header";
import Kryptprofile from "../micro-components/Kryptprofile";
import Nav from "../core-components/Nav";
import {Link, useParams, useNavigate} from "react-router-dom";
import Profilebox from "../macro-components/Profilebox";
import {ReactComponent as Settings} from "../svg/Setting.svg"
import Axios from 'axios';
import {useState, useEffect} from 'react';


export default function Profile(){

    const navigate = useNavigate();
    const {id} = useParams();
    const proid = id

    const [profileDetails, setProfileDetails] = useState({})
    const [trueDetails, setTrueDetails] = useState({})
    const [profileData, setProfileData] = useState([])
    const [dekryptData, setDekryptData] = useState([])
    const [bttnLive, setBttnLive] = useState(true)
    const [bttnLive2, setBttnLive2] = useState(false)
    const [followBttn, setFollowBttn] = useState(false)
    const [following, setFollowing] = useState(false)
    const [follower, setFollower] = useState(false)
    const [message, setMessage] = useState()
    const [followerCount, setFollowerCount] = useState();
    const [followingCount, setFollowingCount] = useState()
    const [newRender, setNewRender] = useState()

   

useEffect(() => {
    console.log(proid)
    if (id === "undefined") {
        navigate('/');
    } else {
        Axios.get(`https://sleepy-escarpment-55626.herokuapp.com//profile/${id}`)
        .then(function(res){
            console.log(res)
            const loggeduser = res.data.loggeduser;
            const profileuser = res.data.profileuser;
            const kryptdata = res.data.kryptdata.reverse()
            const dekryptdata = res.data.dekryptdata.reverse()
            console.log(profileuser._id)
            console.log(loggeduser)
            setProfileData([...kryptdata]);
            setProfileDetails({...loggeduser})
            setTrueDetails({...profileuser})
            setDekryptData([...dekryptdata])
            setFollowingCount(res.data.followingcount);
            setFollowerCount(res.data.followercount)
            console.log(loggeduser.following)
            if(loggeduser._id === profileuser._id){
                setFollowBttn(false)
            } else {
                setFollowBttn(true)
                const isFound = loggeduser.following.some(element =>{
                    if (element.following === profileuser._id){
                    return true;
                    }
                    else {
                    return false
                    }});
                    console.log(isFound);
                setFollowing(isFound)
              const isGot = profileuser.following.some(element =>{
                if (element.following === loggeduser._id){
                    return true
                } else {
                    return false
                }
              }) 
              console.log(isGot);
              setFollower(isGot)
            }
    
          
        })
        .catch(function(error){
            console.log(error);
        })
        .then(function(){
    
        })

    }
   
},[newRender])



    const boxstyle = "profile-box"
    const imgstyle = "profile-image"
    const textsize = "text-sm"

    const navcolor = {
        home:"fill-secondary-900",
        notification:"fill-secondary-900",
        profile:"fill-primary",
        search:"fill-secondary-900"
    }

    const handleClick = (e) => {
       const {name} = e.target
        if(name === "bttn1"){
            if (!bttnLive){
                setBttnLive2(!bttnLive2)
                setBttnLive(!bttnLive)
            }
           
        }
        else if(name === "bttn2"){
            if(!bttnLive2){
                setBttnLive(!bttnLive)
                setBttnLive2(!bttnLive2)
            }
          
        }

    }

   
    const handleFollow = () =>{
        if(following){
            const payload = {
                proid
            }
            Axios.post('/unfollow', payload)
            .then((response) =>{
                console.log(response)
                setFollowing(false)
                setNewRender(true)
               
            })
            .catch((err) =>{
                console.log(err)
            })
            .then(()=>{})
        } else {
            const payload = { proid}
            Axios.post("/follow", payload)
            .then((response) => {
                console.log(response)
                setFollowing(true)
                setNewRender(false)
            })
            .catch((err) =>{
                console.log(err)
            })
            .then(()=>{})
        }
    }

    console.log(trueDetails.bio)

    const profile = "Profile"


    return(
        <div className="flex flex-col items-center scrollbar-hide">
        <Header
            title = {profile}
         />
        <Kryptprofile
        image = {trueDetails.image}
        username = {trueDetails.username}
        imgstyle={imgstyle}
        boxstyle= {boxstyle}
        textsize= {textsize}
         />
        <div className="text-secondary-700 text-sm px-4 w-72 text-center py-4  mt-2 rounded-xl bg-secondary-500">{trueDetails.bio === undefined ? "Nothing to see here" : trueDetails.bio }</div>
        {followBttn === false ?  <p className="text-secondary-700 text-xs py-2">{trueDetails.bio === undefined ? "Go to settings and edit your bio" : "" }</p> : null}
         {followBttn && <div className={following ? "profi" : "profi2" } onClick={handleFollow}>
        {following ? "following" : "follow" } </div> } 
         <p className="text-secondary-700 italic text-xs mt-1 mb-4">{follower ? "follows you" : ""} </p> 
         <div className="flex items-center mb-2">
            <Link to={`/followers/${id}`} className="mr-8 flex flex-col items-center">
            <p className="text-white px-3 py-1 border-2 border-white rounded-full bg-secondary-800 font-bold text-xl">{followerCount}</p>
            <p className="text-secondary-800 font-bold">followers</p>
            </Link> 
            <Link to={`/following/${id}`} className="flex flex-col items-center">
            <p className="text-white px-3 py-1 border-2 border-white rounded-full bg-secondary-800 font-bold text-xl">{followingCount}</p>
            <p className="text-secondary-800 font-bold">following</p>
            </Link>
       </div>  
    
       {followBttn === false ? 
        <Link to="/settings" className="setin">
        <Settings />
           <p className="ml-2">Settings</p>
        </Link> : null}
        
        <div className="w-full mb-28">
        <section className="flex w-full justify-center">
            <button className={ bttnLive ? "pro-bttn rounded-tl-2xl" : "pro-bttn-dormant rounded-tl-2xl"} name="bttn1" onClick={handleClick}>dekrypts</button>
            <button className={ bttnLive2 ? "pro-bttn rounded-tr-2xl" : "pro-bttn-dormant rounded-tr-2xl"} name="bttn2" onClick={handleClick}>my krypts</button>
        </section>
        <section className="w-full overflow-auto"> 
            {bttnLive && dekryptData.map(dekryData=> <Profilebox
               time={dekryData.krypt.time}
               date={dekryData.krypt.date}
               title={dekryData.krypt.title}
               id={dekryData.krypt._id}
             />)}  
               {bttnLive2 && profileData.map(proData=> <Profilebox
               time={proData.time}
               date={proData.date}
               title={proData.title}
               id={proData._id}
             />)}  
         </section>

        </div>
       
        

         <Nav 
             home={navcolor.home}
             notification={navcolor.notification}
             profile={navcolor.profile}
             search={navcolor.search}
             user={profileDetails._id}
        /> 
        </div>
    )
}
