import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import Share from "../macro-components/Share";
import {Link, useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react"
import Axios from 'axios';
import {ReactComponent as Exclaim} from "../svg/Exclamation Mark.svg";
import {ReactComponent as Achievement} from "../svg/Achievement.svg";
import {ReactComponent as Comment} from "../svg/uil_comments-alt.svg";
import ReactPlayer from 'react-player';
import useSWR from "swr";
import Fetching from "../modals/Fetching"


export default function Unlocked(){

  

const navigate = useNavigate();
const {id} = useParams();

const [commentvalue, setCommentValue] = useState("")
const [newRender, setNewRender] = useState(false)
const [user, setUser] = useState(undefined)
const [username, setUserName] = useState("")
const [title, setTitle] = useState("")
const [content, setContent] = useState([])
const [krypt, setKrypt] = useState({})




// const fetcher = (...args) => fetch(...args).then(res => res.json())
// const { data, error } = useSWR(`https://sleepy-escarpment-55626.herokuapp.com/unlock/${id}`, fetcher)


useEffect(()=>{
    const token = localStorage.getItem("jwt")
    console.log(token)
    if (!token){
        navigate("/")
    } else {
        const userid = localStorage.getItem("user")
        setUser(userid)
        const payload = {userid}
        Axios.post(`https://sleepy-escarpment-55626.herokuapp.com/unlock/${id}`, payload)
        .then((response) => {
            console.log(response)
            console.log(response.data)
            setUserName(response.data.data.creator.username)
            setTitle(response.data.data.title)
            setContent([...response.data.content])
            setKrypt(response.data.data)
        })
        .catch(err=>{
            console.log(err)
            //navigate("/")
        })
    }
      
},
[newRender])


// if (!data) return <Fetching />;
// if (error) return <div>failed to load</div>

const timeValue = ()=>{
    let newDate = new Date();
     let hrs = newDate.getHours();
     let mins = newDate.getMinutes();
     if (mins <= 9){
       mins = "0" + mins;
     }
    let today = newDate.getDate();
    let month = newDate.getMonth();
      
     let kryptTime = `${hrs}:${mins}`
     let kryptDate = `${today}, ${month}`
  
     return {kryptDate, kryptTime}
}


const handleChange = e =>{
    const {value} = e.target
    setCommentValue(value)
}

const handleSubmit = (e) =>{
        e.preventDefault()
        const userid = localStorage.getItem("user")
        const time = timeValue().kryptTime
        setCommentValue("")
     const payload = {commentvalue, id, userid, time}
        Axios.post("https://sleepy-escarpment-55626.herokuapp.com/comment", payload)
        .then((res)=>{
            console.log(res)
            setNewRender(!newRender)
        })
        .catch((err)=>{
            console.log(err)
        })
        .then(()=>{})
        
        
}

const navcolor = {
        home:"fill-secondary-900",
        notification:"fill-secondary-900",
        profile:"fill-secondary-900",
        search:"fill-secondary-900"
}

 

    return(
      
        <div className="page">
            <Header />
            <section className="unlock-sec">
            <div className="flex w-full justify-between mb-4">
            <h1 className="unlock-title">{title}</h1>
            <p className="unlock-user"><span className="text-sm text-secondary-700">by </span>@{username}</p>
            </div>
            <div className="px-5 flex items-center flex-col w-fit">
            
            {content.map((krypt, index)=> {if (krypt.includes(".jpg") || krypt.includes(".jpeg") || krypt.includes(".png") || krypt.includes(".jfif") || krypt.includes(".webp")){
                return   <div key={index} className="items-center py-2 rounded-xl">
                         <img src={krypt} alt="kryptedimg" className="object-fit rounded-2xl"/>
                        </div>
            } else if (krypt.includes(".mp3")){

                return  <div key={index}  className="py-2">
                <audio  src={krypt} controls autoPlay/>
                    </div> 
            } else {
               return <div key={index}  className="py-2">
               <p className="text-secondary-700">{krypt}</p>
               </div>
             
            }
              
            })}
            {/* <ReactPlayer className="w-32" url='https://www.youtube.com/watch?v=-o-3Ymwx-9g'/> */}

            </div>

            <section className="flex w-full justify-between px-6 mt-8">
                     <div className="land-con">
                    <Exclaim />
                     {krypt.failure}
                     </div>
                     <div className="land-con">
                       <Achievement />
                    {krypt.success}    
                     </div>
                     <div className="land-con">
                   <Comment />
                     {krypt.comment}
                     </div>
                 </section>
            
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8 bg-secondary-500 px-4 py-6 rounded-xl">
            <p className="text-secondary-300 text-xs pb-2">leave a comment</p>
            <input onChange={handleChange} className="form text-xs" type="text" value ={commentvalue}/>
            <button className="text-white py-2 px-1 mt-2 rounded-xl w-fit bg-secondary-800 text-xs">comment</button>
            </form>
           
           
           
          
            
            {/* {krypt[`text${index}`]}*/} 


            {/* <div className="mb-2">
               <img className="unlock-img" src="img/Rectangle 47.png" alt="" />
            </div>

            <div className="w-32">
               <img className="unlock-img" src="img/Rectangle 47.png" alt="" />
            </div> */}
            <div className="self-center mt-12 mb-2">
           <Share />

           </div>
           <Link className="unlock-bttn" to="/home">
            <button className=""> 
             Home
           </button>
           </Link>
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