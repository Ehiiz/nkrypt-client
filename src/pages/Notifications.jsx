import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import {useEffect, useState} from 'react'
import Axios from "axios";
import {Link, useNavigate} from "react-router-dom"
import {ReactComponent as Ufo} from "../svg/Cityscapes UFO and Alien.svg"

export default function Notification(){
     
    const navigate = useNavigate();
    const navcolor = {
        home:"fill-secondary-900",
        notification:"fill-primary",
        profile:"fill-secondary-900",
        search:"fill-secondary-900"
    }

    const [notifBox, setNotifBox] = useState([])
    const [user, setUser] = useState({})
    const [emptyCase, setEmptyCase] = useState(false)

useEffect(() => {
const token = localStorage.getItem("jwt")
if (!token){
    navigate("/")
} else {
    const userid = localStorage.getItem("user")
    setUser(userid)
    Axios.get("https://sleepy-escarpment-55626.herokuapp.com/notifications")
    .then((response)=>{
        if (response.data.status === "not signed in"){
            navigate("/")
        } else {
        const newNotif = response.data.data.reverse();
        if(newNotif.length === 0){
         setEmptyCase(true)
        }  else {
         setEmptyCase(false)
       }
        setNotifBox(newNotif)
        console.log(response.data.data)
         setUser({...response.data.loggeduser})
        }
    })
    .catch((error)=>{
        console.log(error)
    })
    .then(()=>{})

}
      

    }, [])

    console.log(user)

    const notification = "Notification"

return(
        <div className="h-screen scrollbar-hide bg-secondary-600">
        <Header 
            title={notification}
        />
          {emptyCase && <div className="flex items-center flex-col justify-center pt-24 mt-12">
          
            <Ufo />
              <p className="text-secondary-700 italic">no krypt activity detected</p>
              <p className="text-secondary-700 italic">abduction imminent</p>

          </div>}
        <div className="h-fit bg-secondary-600 mt-16">
        {notifBox.map(notif=>{
            if(notif.type === "create"){
                return <div className="mt-8 pt-1 mb-4 pb-2 px-2 bg-secondary-600"> 
                <div className="flex text-white items-center my-2">
       
                <img className="notif-image" src={notif.user.image} alt="" />
                <p className="ml-2 text-xs"><span className="text-secondary-400"><Link to={`/profile/${notif.user._id}`}>{notif.user.username}</Link></span> created a krypt <span className="text-secondary-400"><Link to={`/krypt/${notif.krypt._id}`}>{notif.krypt.title}</Link></span></p>
                </div>
                 <hr />
                </div>
            } else if (notif.type === "dekrypt"){
                return <div className="mt-8 pt-1 mb-4 pb-2 px-2 bg-secondary-600"> 
                <div className="flex text-white items-center my-2">
       
                <img className="notif-image" src={notif.user.image} alt="" />
                <p className="ml-2 text-xs"><span className="text-secondary-400"><Link to={`/profile/${notif.user._id}`}>{notif.user.username}</Link></span> just dekrypted <span className="text-secondary-400"><Link to={`/krypt/${notif.krypt._id}`}>{notif.krypt.title}</Link></span></p>
                </div>
                 <hr />
                </div>
            } else if (notif.type === "comment"){
                return <div className="mt-8 pt-1 mb-4 pb-2 px-2 bg-secondary-600"> 
                <div className="flex text-white items-center my-2">
       
                <img className="notif-image" src={notif.user.image} alt="" />
                <p className="ml-2 text-xs"><span className="text-secondary-400"><Link to={`/profile/${notif.user._id}`}>{notif.user.username}</Link></span> commented on a krypt <span className="text-secondary-400"><Link to={`/krypt/${notif.krypt._id}`}>{notif.krypt.title}</Link></span></p>
                </div>
                 <hr />
                </div>
            }
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