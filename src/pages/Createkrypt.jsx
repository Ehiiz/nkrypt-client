import {useState, useEffect} from "react";
import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import Text from "../bttns/Text";
import Audio from "../bttns/Audio";
import Photo from "../bttns/Photo";
import {Link, useNavigate} from "react-router-dom";
import Axios from "axios"
import useCreatePost from "../custom-hooks/useCreatePost"



export default function Createkrypt(){

  const navigate = useNavigate();

  const [user, setUser] = useState({})

  //State Management for Content Type
  const [krypt, setKrypt] = useState(["none"])

  //State Management for Content Added
  const [kryptData, setKryptData] = useState()
  const [kryptTitle, setKryptTitle] = useState("")
  const [finalData, setFinalData] = useState({title:"", content:[]})

  useEffect(() => {
    Axios.get('/create')
    .then((res)=>{
      console.log(res)
      setUser({...res.data.user})
    })
    .catch(err=>{
      console.log(err)
    })
    .then(() =>{})


  },[])


  // Button Functions for Adding Content Type

const addImage =()=>{
  setKrypt([...krypt, "image"])
 }

 const addText =()=>{
   setKrypt([...krypt, "text"])
 }

 const addAudio =()=>{
   setKrypt([...krypt, "audio"])
 }
 

  //Onchange Function for Inputs
const updateKryptData = e => {
const {name, value} = e.target;

    let newDate = new Date();
    let hrs = newDate.getHours();
    let mins = newDate.getMinutes();
    let today = newDate.getDate();
    let month = newDate.getMonth();
    
    let kryptTime = `${hrs}:${mins}`
    let kryptDate = `${month}, ${today}`

  
    setKryptData({...kryptData, [name] :value})
    setFinalData({
      title: kryptTitle,
      content: kryptData,
      time: kryptTime,
      date: kryptDate
    })

    }

    console.log(finalData)
    console.log(kryptTitle);
    console.log(kryptData)

      //Submit Function for Content Submission
  const handleSubmit = () =>{
    sendData()
  }

    
    //Data Posting Function
   const sendData = () => {
      const payload = {finalData}
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

  


  //Navigation Colors
    const navcolor = {
      home:"fill-primary",
      notification:"fill-secondary-900",
      profile:"fill-secondary-900",
  }




    return(
     <div className="page">
      <Header />
     <section className="create">
           <div className="w-full flex flex-col">
                <input className="self-left create-title text-white" type="text" placeholder="Title" value={kryptTitle} name="title" onChange={e=>setKryptTitle(e.target.value)} />
                <textarea className="create-area" name="text0"   id="standardtext" cols="30" rows="5" placeholder="Start typing" onChange={updateKryptData}/>
              

                 {krypt.map((kry,index)=>{if(kry.includes("image")){
                  return   <input type="file" name={`image${index}`} id="image" className="self-center text-lg bg-primary mt-2 rounded-full text-white px-4 py-4 w-128"  placeholder="Upload your music"  />
                 }
                 else if(kry.includes("audio")){
                   return   <input type="file" name={`audio${index}`} id="audio" className="self-center text-lg bg-primary mt-2 rounded-full text-white px-4 py-4 w-128"  placeholder="Upload your music"  />
                 }
                 else if(kry.includes("text")){
                  return <textarea className="create-area mt-2" name={`text${index}`}  id="" cols="30" rows="5" placeholder="Add more text" onChange={updateKryptData}/>
                 }

                 })}
           </div>

           

              {/*Button Section  */}
           <div className="flex items-center">
                  <Audio
                  addAudio = {addAudio}
                   />
                  <Text
                  addText = {addText}/>
                  <Photo 
                    addImage = {addImage}
                  />
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