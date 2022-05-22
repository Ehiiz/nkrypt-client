import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import {useEffect, useState} from 'react'
import Axios from "axios";

export default function Notification(){

    const navcolor = {
        home:"fill-secondary-900",
        notification:"fill-primary",
        profile:"fill-secondary-900",
    }

    const [notifBox, setNotifBox] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
       Axios.get("/notifications")
       .then((response)=>{
           console.log(response)
           setNotifBox(response.data.data)
           console.log(response.data.data)
            setUser({...response.data.loggeduser})
       })
       .catch((error)=>{
           console.log(error)
       })
       .then(()=>{})


    }, [])

    const notification = "Notification"

    return(
        <div className="h-screen scrollbar-hide bg-secondary-600">
        <Header 
            title={notification}
        />
        <div className="h-fit bg-secondary-600 mt-16">
        {notifBox.map(notif=>{
            if(notif.type === "create"){
                return <div className="mt-8 pt-1 mb-4 pb-2 px-2 bg-secondary-600"> 
                <div className="flex text-white items-center my-2">
       
                <img className="notif-image" src="" alt="" />
                <p className="ml-2 text-xs"><span className="text-secondary-400">{notif.user.username}</span> created a krypt <span className="text-secondary-400">{notif.krypt.title}</span></p>
                </div>
                 <hr />
                </div>
            } else if (notif.type === "dekrypt"){
                return <div className="mt-8 pt-1 mb-4 pb-2 px-2 bg-secondary-600"> 
                <div className="flex text-white items-center my-2">
       
                <img className="notif-image" src="" alt="" />
                <p className="ml-2 text-xs"><span className="text-secondary-400">{notif.user.username}</span> just dekrypted <span className="text-secondary-400">{notif.krypt.title}</span></p>
                </div>
                 <hr />
                </div>
            } else if (notif.type === "comment"){
                return <div className="mt-8 pt-1 mb-4 pb-2 px-2 bg-secondary-600"> 
                <div className="flex text-white items-center my-2">
       
                <img className="notif-image" src="" alt="" />
                <p className="ml-2 text-xs"><span className="text-secondary-400">{notif.user.username}</span> commented on a krypt <span className="text-secondary-400">{notif.krypt.title}</span></p>
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
            user={user._id}
        />


        </div>
    )
}