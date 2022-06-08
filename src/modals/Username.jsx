import {useState} from "react";
import Axios from "axios";
export default function Username({userAdd, message, usernameSubmit, bttnLive, nameChange }){

//     const [userAdd, setUserAdd] = useState("")
//     const [message, setMessage] = useState("")

// const handleSubmit =()=>{
//     const payload = {userAdd}
//     Axios.post("/setuser", payload)
//     .then(res=>{
//         console.log(res)
//         const status = res.data.status
//         if (status === "success"){

//         } else {
//             setMessage("error creating username")
//         }
//     })

// }
// const userCheck =()=>{
//     const payload = {userAdd}
//     console.log(payload)
//     Axios.post("/checkuser", payload)
//     .then(res=>{
//         console.log(res)
//         const status = res.data.status
//         if(status === "success"){
//             setBttnLive(true)
//             setMessage("username available")
//         } else {
//                 setMessage("username already taken")
//         }
//     })

//}

    return(
        <div className="modal-base">
        
        <div className="w-96 h-84 absolute top-1/4 left-2/4 opacity-100 -translate-x-2/4 -translate-y-4 z-50 text-white drop-shadow-2xl justify-center self-center flex flex-col items-center rounded-2xl py-4 px-4 font-bold bg-secondary-600">
        <label htmlFor="bio" className="text-lg text-secondary-300 font-semibold pb-4">Select a username</label>
        <input className="w-full pl-2 text-white rounded-2xl h-10 bg-secondary-500 placeholder:pl-4 shadow-md" placeholder="@kryptking" type="text" value={userAdd} onChange={(e) => nameChange(e)}/>
        <p className={bttnLive ? "text-secondary-800 text-sm":"text-primary text-sm"}>{message}</p>
        <button className={bttnLive ? "active-m-button" : "dormant-m-button"} onClick={bttnLive ? usernameSubmit : ""}>Submit</button>
        </div>
        </div>
    )
}