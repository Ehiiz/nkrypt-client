import {useState, useEffect, useRef} from "react";
import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import Text from "../bttns/Text";
import Audio from "../bttns/Audio";
import Photo from "../bttns/Photo";
import {Link, useNavigate} from "react-router-dom";
import Axios from "axios"
import Loading from "../modals/Loading";
import {ReactComponent as Close} from "../svg/close.svg"
import {sha1} from 'crypto-hash';
import useSWR from "swr";



export default function Createkrypt(){

  const navigate = useNavigate();

  const [user, setUser] = useState(undefined)

  //State Management for Content Type
  const [krypt, setKrypt] = useState(["none"])

  //State Management for Content Added
  const [kryptData, setKryptData] = useState()
  const [kryptTitle, setKryptTitle] = useState("")
  const [finalData, setFinalData] = useState({title:"", content:[]})
  const [message, setMessage]= useState("")
 

  //Preview Source States
  const [imagePreview, setImagePreview] = useState()
  const [audioPreview, setAudioPreview] = useState()
  const [newAudio, setNewAudio] = useState({public_id:"", url:""})
  const [newImage, setNewImage] = useState({})

  //Modal State Management
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef()
  const fileImageRef = useRef()


useEffect(() => {
  const token = localStorage.getItem("jwt")
  if(!token){
    navigate("/")
  } else {
    const userid = localStorage.getItem("user")
    setUser(userid)
  if (newImage.file) {
    const reader = new FileReader()
    reader.onloadend = () =>{
      setImagePreview(reader.result)
    };
    reader.readAsDataURL(newImage.file)
  } else {
    setImagePreview(null)
  }

  if (newAudio.file) {
    const reader = new FileReader()
    reader.onloadend = () =>{
      setAudioPreview(reader.result)
    };
    reader.readAsDataURL(newAudio.file)
  } else {
    setAudioPreview(null)
  }

    
  }

},[newImage, newAudio])

function truncateString(string, limit) {
  if (string.length > limit) {
    return string.substring(0, limit)
  } else {
    return string
  }
}

//Time creation function
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

//File Uploading Function
const sendFile = (data, name,file)=>{
  
  Axios.post("https://api.cloudinary.com/v1_1/djnkzrito/raw/upload", data)
    .then(res=>{
      console.log(res);
      console.log(res.status)
      const url = res.data.url
      const public_id = res.data.public_id
      setSuccess(true)
     setTimeout(()=>{
      setSuccess(false) 
      setLoading(false)}, 1000) 
      if (name === "audio"){
        setNewAudio({file, url, public_id})
      } else if (name === "image"){
        setNewImage({file, url, public_id})
      }
      setKryptData({...kryptData, [name]: url})
      setFinalData({
        title: kryptTitle,
        content: kryptData,
        time: timeValue().kryptTime,
        date: timeValue().kryptDate
      })
    })
    .catch(err=>{
      console.log(err)
      setNewImage()
      setLoading(false)
      alert("error uploading file");
      window.location.reload()
    })
    .then(() =>{})
   
}

console.log(newImage)
//Data Posting Function
const sendData = () => {
  const id = localStorage.getItem("user")
      const payload = {finalData, kryptTitle, kryptData, id}
      console.log(finalData);
      console.log(payload);
      Axios.post('https://sleepy-escarpment-55626.herokuapp.com/create', payload)
    .then(res => {
            console.log(res);
            const status = res.data.status;
            const id = res.data.newkrypt._id;
            if (status === "success"){
                navigate(`/setlock/${id}`)
                }
                else{
                    alert("Error creating krypt")
                }
        }).catch(error => {
            console.log(error);
           
        })
  }


// Button Functions for Adding Content Type
const addImage =()=>{
 
   const checkValid = krypt.some(kry=>{
      if(kry === "image"){
      return true;
      }
      else {
      return false
      }
    })
console.log(checkValid)
if(checkValid === true){
  alert("You can not post more than one image")
} else {
  fileImageRef.current.click()
  setKrypt([...krypt, "image"])
}
  
 }

const addText =()=>{
   setKrypt([...krypt, "text"])
}

const addAudio =(e)=>{
const checkValid = krypt.some(kry=>{
    if(kry === "audio"){
    return true;
    }
    else {
    return false
    }
  })
console.log(checkValid)
if(checkValid === true){
alert("You can not post more than one audio file")
} else {
fileInputRef.current.click()
setKrypt([...krypt, "audio"])
}
}
 
const titleChange = (e)=>{
  setKryptTitle(truncateString(e.target.value, 21))
  if(kryptTitle.length === 15){
    setMessage("title cannot be more than 21 characters")
  } else {
    setMessage("")
  }
}

  //Onchange Function for Inputs
const updateKryptData = async(e) => {
const {name, value} = e.target;
  setKryptData({...kryptData, [name] :value})
  console.log(kryptData)
   setFinalData({
      title: kryptTitle,
      content: kryptData,
      time: timeValue().kryptTime,
      date: timeValue().kryptDate
    })
}

const onFileChange = (e) =>{
      const fileType = e.target.name.substr(0,5)
      if (fileType === "audio"){
        if(e.target.files[0]){
          console.log(e.target.files[0])
          let formData = new FormData();
          formData.append('file', e.target.files[0] )
          formData.append('upload_preset', "gh7pirve")
          setLoading(true)
          sendFile(formData, e.target.name,e.target.files[0])
        } else if (!e.target.files[0]){
          const newKrypt  = krypt.filter((kry)=> kry !== "audio")
          setKrypt(newKrypt)
        }
       
      }
      else if(fileType === "image") {
        if(e.target.files[0]){
          console.log(e.target.files[0])
          let formData = new FormData();
          formData.append('file', e.target.files[0] )
          formData.append('upload_preset', "gh7pirve")
          setLoading(true)
          sendFile(formData, e.target.name, e.target.files[0])
        } else if (!e.target.files[0]) {
          const newKrypt  = krypt.filter((kry)=> kry !== "image")
          setKrypt(newKrypt)
        }
       
      }
      
}

//Submit Function for Content Submission
const handleSubmit = () =>{
    sendData()
}

const handleDelete = (e) =>{
    console.log(e.target.name)
    const name = e.target.name
    const url = e.target.id
    console.log(url)

    const public_id = e.target.value
   
   const payload = {public_id}
  
    console.log(name)
    Axios.post("https://sleepy-escarpment-55626.herokuapp.com/destroy", payload)
    .then(res=>{
      console.log(res);
      console.log(res.status)
      if(res.data.status === "success"){
        if (name === "audio"){

          // Remove Audio from krypt array 
         const newKrypt  = krypt.filter((kry)=> kry !== "audio")
         const asArray = Object.entries(kryptData)
         const filtered = asArray.filter(([key, value])=> value !== url)
          const newKryptData = Object.fromEntries(filtered)
         setKryptData(newKryptData)
         setKrypt(newKrypt)
          setNewAudio({file:null, public_id:""})

        } else if (name === "image"){

        // Remove Image from krypt array in order to remove image preview

        const newKrypt  = krypt.filter((kry)=> kry !== "image")
        const asArray = Object.entries(kryptData)
        const filtered = asArray.filter(([key, value])=> value !== url)
        const newKryptData = Object.fromEntries(filtered)
         setKryptData(newKryptData)
        setKrypt(newKrypt)
        setNewImage({file:null, public_id:""})

        }
       
        setFinalData({
          title: kryptTitle,
          content: kryptData,
          time: timeValue().kryptTime,
          date: timeValue().kryptDate
        })
      }
    
    })
    .catch(err=>{
      console.log(err)
   
    })
    .then(() =>{})
}

  //Navigation Colors
    const navcolor = {
      home:"fill-secondary-900",
      notification:"fill-secondary-900",
      profile:"fill-secondary-900",
      search:"fill-secondary-900"
  }

    return(
     
     <div className="page">
      {loading && <Loading 
        success={success}
      />}
      <Header />
     <section className="create">
           <div className="w-full flex h-max-screen flex-col">
                <input className="self-left create-title text-white" type="text" placeholder="Title" value={kryptTitle} name="title" onChange={titleChange} />
                <p className="text-secondary-700 text-xs self-center mb-3 py-1">{message}</p>
                <textarea className="create-area" name="text0"   id="standardtext" cols="30" rows="5" placeholder="Start typing" onChange={updateKryptData}/>
              
                <div className="h-min-screen bg-secondary-600 flex-col flex items-center mt-2">
                {krypt.map((kry,index)=>{if(kry.includes("image")){
                  return  <div className="flex self-center items-center mt-4 relative">
                  <button value={newImage.public_id} name="image" id={newImage.url} onClick={handleDelete} className="text-xl py-2 px-2 shadow-xl self-end rounded-full bg-secondary-100 text-secondary-500 absolute -left-4 -top-4"><Close /></button>
                   <img src={imagePreview} alt="img-prev" />
                    </div>
                     }
                 else if(kry.includes("audio")){
                   return  <div className="flex self-center items-center mt-4 px-2 mb-3 w-fit relative">
                   <button value={newAudio.public_id} name="audio" id={newAudio.url} onClick={handleDelete} className="text-xl z-50 py-2 px-2 shadow-2xl self-end rounded-full bg-secondary-100 text-secondary-500 absolute -left-4 -top-4"><Close /></button>
                   <audio  src={audioPreview} controls autoPlay/>
                  </div>
                 }
                 else if(kry.includes("text")){
                  return <textarea className="create-area mt-2" name={`text${index}`}  id="" cols="30" rows="5" placeholder="Add more text" onChange={updateKryptData}/>
                 }

                 })}

                </div> 
                
           </div>

           

              {/*Button Section  */}
           <div className="flex items-center">
                <div onClick={addAudio}>
                <Audio/>
                <input name="audio" type="file" ref={fileInputRef} accept="audio/*" className="hidden" onChange={onFileChange}/>
                </div>
                  <Text
                  addText = {addText}/>

                 <div onClick={addImage}>
                 <Photo/>
                 <input  name="image" type="file" ref={fileImageRef} accept="image/*" className="hidden" onChange={onFileChange}/>
                 </div>
                
            </div>

          
            <button onClick={handleSubmit} className="mt-2 shadow border-1 sub-bttn"> 
              <Link to="">Submit</Link>
             </button>
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


// <div className="flex self-center items-center w-fit">
// <input  name={`audio${index}`} id="audio" className="self-center text-sm bg-secondary-500 mt-2 rounded-full text-white px-4 py-2" accept="audio/*" placeholder="Upload your music" onChange={onFileChange} />
// <button name="audio" className="ml-4 text-secondary-500 font-bold px-4  text-xs py-2 rounded-2xl bg-secondary-800" onClick={submitFileData}>Submit</button>
// </div>
