import { useState } from "react";
import Axios from "axios";
import {useParams, useNavigate} from "react-router-dom";

export default function Reset (){

const {id} = useParams();
const navigate = useNavigate();


const [newPassword, setNewPassword] = useState("")

const handleSubmit = ()=>{

const payload = {newPassword}
console.log(payload)
Axios.post(`https://sleepy-escarpment-55626.herokuapp.com/${id}/resetpassword`, payload)
.then(response =>{
    console.log(response)
    const status = response.data.status
    if (status === "success"){
        alert("Password reset successfully")
        navigate("/")
    }
})
.catch(error =>{
     console.log(error)
})
.then(() =>{})

}


    return (
        <div className="modal-base">
        
        <div className="w-96 h-84 absolute top-1/4 left-2/4 opacity-100 -translate-x-2/4 -translate-y-4 z-50 text-white drop-shadow-2xl justify-center self-center flex flex-col items-center rounded-2xl py-4 px-4 font-bold bg-secondary-600">
        <label htmlFor="bio" className="text-lg text-secondary-300 font-semibold pb-4">Enter new password</label>
        <input className="w-full pl-2 text-white rounded-2xl h-10 bg-secondary-500 placeholder:pl-4 shadow-md" placeholder="set new password" type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <button className="text-white text-xl bg-primary py-2 px-6 font-semibold rounded-xl w-fit mt-4" onClick={handleSubmit}>Submit</button>
        </div>
        </div>
    )
}