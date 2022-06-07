import {ReactComponent as Close} from "../svg/close.svg"
import {useState} from "react"
import Axios from "axios";

export default function Forgot ({closeModal}){

const [emailAdd, setEmailAdd] = useState("")

const handleSubmit =()=>{
    const payload = {emailAdd}
    Axios.post("/forgot", payload)
    .then((res)=>{
        console.log(res.data.status)
        const status = res.data.status
        if (status === "success"){
            alert("Check your email box for password reset link")
            closeModal()
        } else {
            alert("Email does not exist")
            closeModal()
        }
    })

}

    return (
        <div className="modal-base">
        
        <div className="w-96 h-84 absolute top-1/4 left-2/4 opacity-100 -translate-x-2/4 -translate-y-4 z-50 text-white drop-shadow-2xl justify-center self-center flex flex-col items-center rounded-2xl py-4 px-4 font-bold bg-secondary-600">
        <p onClick={()=> closeModal()} className="text-xl  cursor-pointer py-2 px-2 shadow-xl self-end rounded-full bg-secondary-100 text-secondary-500"><Close /></p>
        <label htmlFor="bio" className="text-lg text-secondary-300 font-semibold pb-4">Enter email address</label>
        <input className="w-full pl-2 text-white rounded-2xl h-10 bg-secondary-500 placeholder:pl-4 shadow-md" placeholder="email address linked to account" type="text" value={emailAdd} onChange={(e) => setEmailAdd(e.target.value)} />
        <button className="text-white text-xl bg-primary py-2 px-6 font-semibold rounded-xl w-fit mt-4" onClick={handleSubmit}>Submit</button>
        </div>
        </div>
    )
}