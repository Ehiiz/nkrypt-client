import {useState, useEffect, useRef} from "react";
import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import Text from "../bttns/Text";
import Audio from "../bttns/Audio";
import Photo from "../bttns/Photo";
import {Link, useNavigate} from "react-router-dom";
import Axios from "axios"
import useCreatePost from "../custom-hooks/useCreatePost"
import Loading from "../modals/Loading";



export default function Createkrypt(){

  const navigate = useNavigate();

  const [user, setUser] = useState({})

  //State Management for Content Type
  const [krypt, setKrypt] = useState(["none"])

  //State Management for Content Added
  const [kryptData, setKryptData] = useState()
  const [kryptTitle, setKryptTitle] = useState("")
  const [finalData, setFinalData] = useState({title:"", content:[]})
 

  //Preview Source States
  const [imagePreview, setImagePreview] = useState()
  const [audioPreview, setAudioPreview] = useState()
  const [newAudio, setNewAudio] = useState()
  const [newImage, setNewImage] = useState()

  //Modal State Management
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef()
  const fileImageRef = useRef()


useEffect(() => {
  Axios.get('/create')
  .then((res)=>{
    if (res.data.status === "not signed in"){
      navigate("/")
    } else {
      console.log(res)
      setUser({...res.data.user})
    }
   
  })
  .catch(err=>{
    console.log(err)
  })
  .then(() =>{})

  if (newImage) {
    const reader = new FileReader()
    reader.onloadend = () =>{
      setImagePreview(reader.result)
    };
    reader.readAsDataURL(newImage)
  } else {
    setImagePreview(null)
  }

  if (newAudio) {
    const reader = new FileReader()
    reader.onloadend = () =>{
      setAudioPreview(reader.result)
    };
    reader.readAsDataURL(newAudio)
  } else {
    setAudioPreview(null)
  }

},[newImage, newAudio])

//Time creation function
const timeValue = ()=>{
  let newDate = new Date();
   let hrs = newDate.getHours();
   let mins = newDate.getMinutes();
   if (mins < 9){
     mins = "0" + mins;
   }
  let today = newDate.getDate();
  let month = newDate.getMonth();
    
   let kryptTime = `${hrs}:${mins}`
   let kryptDate = `${month}, ${today}`

   return {kryptDate, kryptTime}

}

//File Uploading Function
const sendFile = (data, name,file)=>{
  Axios.post("https://api.cloudinary.com/v1_1/djnkzrito/raw/upload", data)
    .then(res=>{
      console.log(res);
      console.log(res.status)
      const url = res.data.url
      setSuccess(true)
     setTimeout(()=>{
      setSuccess(false) 
      setLoading(false)}, 1000) 
      if (name === "audio"){
        setNewAudio(file)
      } else if (name === "image"){
        setNewImage(file)
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
    })
    .then(() =>{})
   
}

//Data Posting Function
const sendData = () => {
      const payload = {finalData, kryptTitle, kryptData}
      console.log(finalData);
      console.log(payload);
      Axios.post('/create', payload)
    .then(res => {
            console.log(res);
            const status = res.data.status;
            const id = res.data.newkrypt._id;
            if (status === "success"){
                navigate(`/setlock/${id}`)
                }
                else{
                    navigate('/create')
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
        console.log(e.target.files[0])
        let formData = new FormData();
        formData.append('file', e.target.files[0] )
        formData.append('upload_preset', "gh7pirve")
        setLoading(true)
        sendFile(formData, e.target.name,e.target.files[0])
      }
      else if(fileType === "image") {
        console.log(e.target.files[0])
        let formData = new FormData();
        formData.append('file', e.target.files[0] )
        formData.append('upload_preset', "gh7pirve")
        setLoading(true)
        sendFile(formData, e.target.name, e.target.files[0])
      }
      
}

//Submit Function for Content Submission
  const handleSubmit = () =>{
    sendData()
  }


  //Navigation Colors
    const navcolor = {
      home:"fill-secondary-900",
      notification:"fill-secondary-900",
      profile:"fill-secondary-900",
  }

  
  console.log(finalData)
  console.log(kryptTitle);
  console.log(kryptData)




    return(
     
     <div className="page">
      {loading && <Loading 
        success={success}
      />}
      <Header />
     <section className="create">
           <div className="w-full flex flex-col">
                <input className="self-left create-title text-white" type="text" placeholder="Title" value={kryptTitle} name="title" onChange={e=>setKryptTitle(e.target.value)} />
                <textarea className="create-area" name="text0"   id="standardtext" cols="30" rows="5" placeholder="Start typing" onChange={updateKryptData}/>
              
                 
                 {krypt.map((kry,index)=>{if(kry.includes("image")){
                  return  <div className="flex self-center items-center mt-2">
                   <img src={imagePreview} alt="img-prev" />
                    </div>
                     }
                 else if(kry.includes("audio")){
                   return  <div className="flex self-center items-center  mt-2 w-fit">
                   <audio  src={audioPreview} controls autoPlay/>
                  </div>
                 }
                 else if(kry.includes("text")){
                  return <textarea className="create-area mt-2" name={`text${index}`}  id="" cols="30" rows="5" placeholder="Add more text" onChange={updateKryptData}/>
                 }

                 })}
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
                user={user._id}
            />

      </div>
    )
}


// <div className="flex self-center items-center w-fit">
// <input  name={`audio${index}`} id="audio" className="self-center text-sm bg-secondary-500 mt-2 rounded-full text-white px-4 py-2" accept="audio/*" placeholder="Upload your music" onChange={onFileChange} />
// <button name="audio" className="ml-4 text-secondary-500 font-bold px-4  text-xs py-2 rounded-2xl bg-secondary-800" onClick={submitFileData}>Submit</button>
// </div>