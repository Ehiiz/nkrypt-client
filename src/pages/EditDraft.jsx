import {useState, useEffect, useRef} from "react";
import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import {Link, useNavigate, useParams} from "react-router-dom";
import Axios from "axios"




export default function EditDraft(){


  const [user, setUser] = useState({})



  //State Management for Content Added
  const [kryptData, setKryptData] = useState([])

 





useEffect(() => {
  Axios.get("/drafts")
  .then((res)=>{
    console.log(res)
    const data = res.data.data.reverse()
    setKryptData([...data])
    setUser(res.data.user)

  })
  .catch(err => {
    console.log(err)
  })
  .then(()=>{})
},[])


console.log(kryptData)

  //Navigation Colors
    const navcolor = {
      home:"fill-secondary-900",
      notification:"fill-secondary-900",
      profile:"fill-secondary-900",
      search:"fill-secondary-900"
  }

  const drafts = "Drafts"




    return(
     
     <div className="page">
    
      <Header 
        title={drafts}
      />
      <div className="h-fit bg-secondary-600 mt-16 w-full px-4 pb-48">
      {kryptData.map(kryptResult=><Link to={`/setlock/${kryptResult._id}`} className="mb-2 flex items-center justify-between py-4 w-full px-4 bg-secondary-500 rounded-xl"> 
                      <p className="text-white w-full">{kryptResult.title}</p>
                  </Link>
          )}
        
      </div>
  
    
          
         
           <Nav 
                home={navcolor.home}
                notification={navcolor.notification}
                profile={navcolor.profile}
                search={navcolor.search}
                user={user._id}
            />

      </div>
    )
}
