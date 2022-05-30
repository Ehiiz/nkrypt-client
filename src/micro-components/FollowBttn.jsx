import Axios from "axios";
import {useState, useEffect} from "react"

export default function FollowBttn({id, checkClick, following_status}){

   const [newRender, setNewRender] = useState(following_status)
   
    const checkClick2 =(e)=>{
       setNewRender(!following_status)
    }

    return (
        <><button  className={newRender ? "profi4" : "profi3"} value={`${id}`} name={`${following_status}`} onClick={e=>{   checkClick2(); checkClick(e);}}>{newRender ? "following" : "follow"}</button></>
    )
}