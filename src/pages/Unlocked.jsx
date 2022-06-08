import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import Share from "../macro-components/Share";
import {Link, useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react"
import Axios from 'axios';
import {ReactComponent as Exclaim} from "../svg/Exclamation Mark.svg";
import {ReactComponent as Achievement} from "../svg/Achievement.svg";
import {ReactComponent as Comment} from "../svg/uil_comments-alt.svg";
import ReactPlayer from 'react-player'


export default function Unlocked(){

    const navcolor = {
        home:"fill-secondary-900",
        notification:"fill-secondary-900",
        profile:"fill-secondary-900",
        search:"fill-secondary-900"
    }

    const navigate = useNavigate();
    const {id} = useParams();
    const [kryptContent, setKryptContent] = useState([])
    const [kryptTitle, setKryptTitle] = useState("");
    const [kryptCreator, setKryptCreator] = useState("")
    const [user, setUser] = useState("")
    const [kryptInfo, setKryptInfo] = useState({})
    const [commentvalue, setCommentValue] = useState("")
    const [newRender, setNewRender] = useState(false)
    useEffect(()=>{
        Axios.get(`/unlock/${id}`)
        .then(response => {
            if (response.data.status === "not signed in"){
                navigate("/")
            } else if (response.data.status === "failure") {
                 navigate("/home")
            } else if (response.data.status === "success"){
                console.log(response)
            console.log(response.data.data.content)
            console.log(response.data.data.creator.username)
            let contentVal = Object.values(response.data.data.content)
            setUser(response.data.user)
            console.log(contentVal)
            setKryptInfo({...response.data.data})
            setKryptContent([...contentVal])
            setKryptCreator(response.data.data.creator.username)
            setKryptTitle(response.data.data.title)
            }
        })
        .catch(error=>{
            console.log(error)
        })
        .then(()=>{})

    },
    [newRender])

   const handleChange = e =>{
    const {value} = e.target
    setCommentValue(value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
     const payload = {commentvalue, id}
        Axios.post("/comment", payload)
        .then((res)=>{
            console.log(res)
            setCommentValue("")
            setNewRender(!newRender)
        })
        .catch((err)=>{
            console.log(err)
        })
        .then(()=>{})
        
        
    }

    return(
      
        <div className="page">
            <Header />
            <section className="unlock-sec">
            <div className="flex w-full justify-between mb-4">
            <h1 className="unlock-title">{kryptTitle}</h1>
            <p className="unlock-user">{kryptCreator}</p>
            </div>
            <div className="px-5 flex items-center flex-col w-fit">
            
            {kryptContent.map((krypt, index)=> {if (krypt.includes(".jpg")){
                return   <div className="items-center py-2 rounded-xl">
                         <img src={krypt} alt="kryptedimg" className="object-fit rounded-2xl"/>
                        </div>
            } else if (krypt.includes(".mp3")){

                return  <div className="py-2">
                <audio  src={krypt} controls autoPlay/>
                    </div> 
            } else {
               return <div className="py-2">
               <p className="text-secondary-700">{krypt}</p>
               </div>
             
            }
              
            })}
            {/* <ReactPlayer className="w-32" url='https://www.youtube.com/watch?v=-o-3Ymwx-9g'/> */}

            </div>

            <section className="flex w-full justify-between px-6 mt-8">
                     <div className="land-con">
                    <Exclaim />
                     {kryptInfo.failure}
                     </div>
                     <div className="land-con">
                       <Achievement />
                    {kryptInfo.success}    
                     </div>
                     <div className="land-con">
                   <Comment />
                     {kryptInfo.comment}
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