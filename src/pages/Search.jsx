import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import Timebox from "../macro-components/Timebox";
import Trending from "../macro-components/Trending";
import {useEffect, useState} from "react"
import Axios from "axios"
import {useNavigate} from "react-router-dom"

export default function Search(){
const [topKrypt, setTopKrypt] = useState([])
const [profiles, setProfiles] = useState([])
const [searchValue, setSearchValue] = useState("")
const [user, setUser]= useState("")


const navigate = useNavigate()

useEffect(() => {
Axios.get('/search')
.then(res=>{
    console.log(res)
    setProfiles([...res.data.topKrypters])
    setTopKrypt([...res.data.topKrypts])
    setUser(res.data.user)
})
.catch(err=>{
    console.log(err)
})
.then(()=>{})



},[searchValue])



// if (title){
// <p></p>
//}

console.log(topKrypt)
console.log(searchValue)


const handleSubmit = (e) =>{
   e.preventDefault()
    const payload = {searchValue}
    
   const endPoint = searchValue.toLowerCase()
console.log(payload)
    Axios.post("/search", payload)
    .then(res=>{
        console.log(res)
        const searchKrypt = res.data.searchKrypt
        const searchUser = res.data.searchUser;
        const usefollowingID = res.data.usefollowingID;
        const usefollowersID = res.data.usefollowersID;
        const userid = res.data.userid
       navigate(`/search/${endPoint}`, {state:{searchUser,searchKrypt, usefollowingID,usefollowersID, userid, searchValue}})
    })
    .catch(err=>{
        console.log(err)
    })
    .then(()=>{})
}

const navcolor = {
    home:"fill-secondary-900",
    notification:"fill-secondary-900",
    profile:"fill-secondary-900",
}

    const search = "Search"
    return(
        <div className="bg-secondary-600 w-full h-screen flex flex-col items-center mb-12">
          <Header
          title={search} />

           <form onSubmit={handleSubmit} className="flex justify-between w-full px-4 mb-2 h-8 fixed top-14">
            <input type="text" onChange={(e)=>setSearchValue(e.target.value)} value={searchValue} className="text-white shadow-inner border-hidden drop-shadow-2xl w-full bg-secondary-500 rounded-full placeholder:text-gray-500 placeholder:text-sm placeholder:px-2 active:border-white active:border-2;" placeholder="search username or krypt"/>
            {/* <button className="text-white ml-4 px-2 py-2 bg-primary rounded-2xl font-bold">Search</button> */}
            </form>
            <div className="mt-24 bg-secondary-600 w-full">
            <p className="text-secondary-700 px-4">Top Dekrypters</p>
            <Trending 
                profiles={profiles}
            />
            </div>
         
             <div className="w-full px-2 mt-2 pb-16 bg-secondary-600">
                <p className="text-secondary-700 px-4 py-2">Top Krypts</p>
                {topKrypt.reverse().map(homedata=> <Timebox
                   title={homedata.title}
                //    username={homedata.creator.username}
                   date={homedata.date}
                   time={homedata.time}
                   success={homedata.success}
                   failed={homedata.failure}
                   comments={homedata.comment} 
                   id={homedata._id}
          />

          )}
            </div> 

          
        <Nav 
             home={navcolor.home}
                notification={navcolor.notification}
                profile={navcolor.profile}
                user={user}
        />
        </div>
    )
}