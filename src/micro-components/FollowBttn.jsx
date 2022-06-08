import Axios from "axios";
import {useState, useEffect} from "react"

export default function FollowBttn({id, checkClick, following_status}){

   const [newRenderz, setNewRenderz] = useState(following_status)
   
    const checkClick2 =(e)=>{
       setNewRenderz(!following_status)
    }

    console.log(newRenderz)

    return (
        <><button  className={newRenderz ? "profi4" : "profi3"} value={`${id}`} name={`${newRenderz}`} onClick={e=>{   checkClick2(); checkClick(e);}}>{newRenderz ? "following" : "follow"}</button></>
    )
}