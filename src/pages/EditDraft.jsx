import {useState, useEffect, useRef} from "react";
import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import {Link, useNavigate, useParams} from "react-router-dom";
import Axios from "axios"
import {ReactComponent as Ghost} from "../svg/Spooky Stickers Ghost.svg"
import {ReactComponent as Delete} from "../svg/Delete.svg"
import useSWR from "swr";




export default function EditDraft(){


  const [user, setUser] = useState("")



  //State Management for Content Added
  const [kryptData, setKryptData] = useState([])
  const [newRender, setNewRender] = useState(false)
  const [emptyCase, setEmptyCase] = useState(false)


useEffect(() => {
  Axios.get("https://sleepy-escarpment-55626.herokuapp.com/drafts")
  .then((res)=>{
    console.log(res)
    const data = res.data.data.reverse()
    if (data.length === 0){
      setEmptyCase(true)
    } else {
      setEmptyCase(false)
    }
    setKryptData([...data])
    setUser(res.data.user)

  })
  .catch(err => {
    console.log(err)
  })
  .then(()=>{})
},[newRender])


const handleDelete = (e)=>{
  const deleteId = e.target.name

  console.log(deleteId)
 
  const payload = {deleteId}
  Axios.post("https://sleepy-escarpment-55626.herokuapp.com/deletekrypt", payload)
  .then(res=>{
    console.log(res)
    const status = res.data.status;
    if (status === "success"){
      setNewRender(!newRender)
    } else {
      alert("failure deleting krypt")
      setNewRender(!newRender)
    }
    
  })
  .catch(err => {
    console.log(err)
    setNewRender(!newRender)
  })
  .then(()=>{})
}

  //Navigation Colors
    const navcolor = {
      home:"fill-secondary-900",
      notification:"fill-secondary-900",
      profile:"fill-secondary-900",
      search:"fill-secondary-900"
  }

  console.log(user)

  const drafts = "Drafts"




    return(
     
     <div className="page">
    
      <Header 
        title={drafts}
      />
      <div className="h-fit bg-secondary-600 mt-16 w-full px-4 pb-48">
      {kryptData.map(kryptResult=><div onClick={handleDelete} value={kryptResult._id} name="blaze" className="mb-2 flex items-center justify-between py-4 w-full px-4 bg-secondary-500 rounded-xl"> 
                      <Link to={`/setlock/${kryptResult._id}`} className="text-white w-full">{kryptResult.title}</Link>
                      <button onClick={handleDelete}  className="text-white bg-primary py-2 px-2 rounded-xl" name={kryptResult._id}><Delete /></button>
      
                  </div>
          )}
          {emptyCase && <div className="flex items-center flex-col mt-12">
          <Ghost />
            
              <p className="text-secondary-700 mt-4 italic">no drafts here</p>
              <p className="text-secondary-700 italic">just ghosts of unsent krypts</p>

          </div>}
        
      </div>
  
    
          
         
           <Nav 
                home={navcolor.home}
                notification={navcolor.notification}
                profile={navcolor.profile}
                search={navcolor.search}
                user={"62a374fcafcbd93ed7956d44"}
            />

      </div>
    )
}
