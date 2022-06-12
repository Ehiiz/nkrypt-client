import Header from "../core-components/Header"
import Nav from '../core-components/Nav'
import { useState, useEffect, useRef } from "react"
import{Link, useLocation} from "react-router-dom"
import {ReactComponent as Exclaim} from "../svg/Exclamation Mark.svg";
import {ReactComponent as Achievement} from "../svg/Achievement.svg";
import {ReactComponent as Comment} from "../svg/uil_comments-alt.svg";
import Axios from "axios"
import ProfileSix from "../img/Rectangle 47.png";


export default function SearchResult(){

const [userResults, setUserResults] = useState([]);
const [kryptResults, setKryptResults] = useState([]);
const [bttnLive, setBttnLive] = useState(true)
const [bttnLive2, setBttnLive2] = useState(false)
const [searchValue, setSearchValue] = useState("")
const [newRender, setNewRender] = useState(false)
const [emptyMessage, setEmptyMessage] = useState("")
const [emptyKrypt, setEmptyKrypt] = useState("")
const [user, setUser] = useState("")
const count = useRef(0)

const location = useLocation();


useEffect(() => {
   console.log(count.current)
    if (count.current === 0){
        setKryptResults([...location.state.searchKrypt])
        const usefollowingID = location.state.usefollowingID;
        const usefollowersID = location.state.usefollowersID;
        const searchUser = location.state.searchUser;
        const userid = location.state.userid;
        const searchValue = location.state.searchValue;
        setUser(userid)
        setSearchValue(searchValue)
        const kryptSearch = location.state.searchKrypt
        if(kryptSearch.length === 0){
            setEmptyKrypt("No krypts found")
        } else {
            setEmptyKrypt("")
        }
        const newarray =  searchUser.reduce((r,i)=>{
            if(usefollowingID.includes(i._id)){
                console.log("match")
                return [...r, {...i, following_status:true}]
            } else {
                console.log("no match")
                return [...r, {...i, following_status:false}]
            }
        },[])
    
        const finalfollowing = newarray.reduce((r,i)=>{
            if(usefollowersID.includes(i._id)){
                console.log("follower match")
                return [...r, {...i, follower_status:true}]
            } else {
                console.log("follower no match")
                return [...r, {...i, follower_status:false}]
            }
        },[])
        if(finalfollowing.length < 1) {
            setEmptyMessage("No user found")
        } else {
            setEmptyMessage("")
        }
    
        setUserResults([...finalfollowing])
    
    }
    else {
        const payload = {searchValue}
        console.log(payload)    
        const endPoint = searchValue.toLowerCase()
        console.log(payload)
         Axios.post("https://sleepy-escarpment-55626.herokuapp.com/search", payload)
         .then(res=>{
             console.log(res)
             const searchUser = res.data.searchUser;
             const usefollowingID = res.data.usefollowingID;
             const usefollowersID = res.data.usefollowersID;
             const userid = res.data.userid
             setUser(userid)
             setSearchValue(searchValue)
             setKryptResults([...res.data.searchKrypt])
             const kryptSearch = res.data.searchKrypt
             if(kryptSearch.length === 0){
                 setEmptyKrypt("No krypts found")
             } else {
                 setEmptyKrypt("")
             }
             const newarray =  searchUser.reduce((r,i)=>{
                 if(usefollowingID.includes(i._id)){
                     console.log("match")
                     return [...r, {...i, following_status:true}]
                 } else {
                     console.log("no match")
                     return [...r, {...i, following_status:false}]
                 }
             },[])
         
             const finalfollowing = newarray.reduce((r,i)=>{
                 if(usefollowersID.includes(i._id)){
                     console.log("follower match")
                     return [...r, {...i, follower_status:true}]
                 } else {
                     console.log("follower no match")
                     return [...r, {...i, follower_status:false}]
                 }
             },[])
             if(finalfollowing.length < 1) {
                 setEmptyMessage("No user found")
             } else {
                 setEmptyMessage("")
             }
         
             setUserResults([...finalfollowing])
         

         })
         .catch(err=>{
             console.log(err)
         })
         .then(()=>{})
        
    }

},[newRender])

console.log(userResults)
console.log(kryptResults)
console.log(searchValue)

const checkClick =(e)=>{
    let proid = e.target.value;
    let followstate = e.target.name;
    count.current = count.current + 1
    console.log(proid)
    const payload = {
        proid
    }
    console.log(followstate)

    if(followstate === "true"){
        Axios.post('https://sleepy-escarpment-55626.herokuapp.com/unfollow', payload)
        .then((response) =>{
            console.log(response)
            setNewRender(!newRender)
        })
        .catch((err) =>{
            console.log(err)
        })
        .then(()=>{})
       
    } else if (followstate === "false") {
        Axios.post('https://sleepy-escarpment-55626.herokuapp.com/follow', payload)
        .then((response) =>{
            console.log(response)
            setNewRender(!newRender)
        })
        .catch((err) =>{
            console.log(err)
        })
        .then(()=>{})
        
    }
    console.log(e.target.value)
    console.log(e.target.name)
}

console.log(newRender)

const handleSubmit = (e) =>{
   e.preventDefault()
   count.current = count.current + 1
     setNewRender(!newRender)

}

const handleClick =(e)=>{
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



const navcolor = {
    home:"fill-secondary-900",
    notification:"fill-secondary-900",
    profile:"fill-secondary-900",
    search:"fill-primary"
}

return(
        <div className="h-screen scrollbar-hide bg-secondary-600">
    <Header/>
   {/* <p className="text-sm text-white pt-28">{location.state.datas}</p> */}
    <form onSubmit={handleSubmit} className="flex justify-between w-full px-4 mb-2 h-8 fixed top-14">
            <input type="text" onChange={(e)=>setSearchValue(e.target.value)} value={searchValue} className="text-white shadow-inner border-hidden drop-shadow-2xl w-full bg-secondary-500 rounded-full placeholder:text-gray-500 placeholder:text-sm placeholder:px-2 active:border-white active:border-2;" placeholder="search username or krypt"/>
            {/* <button className="text-white ml-4 px-2 py-2 bg-primary rounded-2xl font-bold">Search</button> */}
    </form>
    <section className="pt-24 px-4 flex w-full justify-between">
            <button className={ bttnLive ? "search-bttn" : "search-bttn2"} name="bttn1" onClick={handleClick}>users</button>
            <button className={ bttnLive2 ? "search-bttn" : "search-bttn2"} name="bttn2" onClick={handleClick}>krypts</button>
        </section>
    <div className="h-fit bg-secondary-600 mt-2 px-4 pb-24">
    {bttnLive &&  userResults.map(userResult=>{
       return <div className="pt-1 flex items-center justify-between pb-2 w-full px-4 bg-secondary-600">
                 <div>
                     <div className="py-1">
                     <img src={userResult.image} alt="dp" className="w-12 rounded-full border-2 border-white" />
                     </div>
                     <p className="text-sm text-secondary-400"><Link to={`/profile/${userResult._id}`}>{userResult.username}</Link></p>
                    {userResult.follower_status && <p className="text-xs text-secondary-700 ml-1 pt-1">follows you</p>} 
                 </div>
                 <div>
                 <button  className={userResult.following_status ? "profi4" : "profi3"} value={`${userResult._id}`} name={`${userResult.following_status}`} onClick={checkClick}>{userResult.following_status ? "following" : "follow"}</button>
                 </div>
                
            </div>
    })}
    {bttnLive &&  <p className="text-lg text-secondary-700">{emptyMessage}</p> }
    {bttnLive2 &&  <p className="text-lg text-secondary-700">{emptyKrypt}</p> }

    {bttnLive2 && kryptResults.map(kryptResult=>{
       return <Link to={`/krypt/${kryptResult._id}`} className="mb-2 flex items-center justify-between py-4 w-full px-4 bg-secondary-500 rounded-xl"> 
                <p className="text-white w-full">{kryptResult.title}</p>
                <div className="flex justify-between w-full">
                <div className="flex flex-col items-center">
                    <p className="text-white">{kryptResult.success}</p>
                  <Achievement />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-white">{kryptResult.failure}</p>
                   <Exclaim />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-white">{kryptResult.comment}</p>
                   <Comment />
                </div>
                </div> 
            </Link>
    })}
    </div>
        
    
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
