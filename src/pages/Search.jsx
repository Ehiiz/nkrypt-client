import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import Timebox from "../macro-components/Timebox";
import Trending from "../macro-components/Trending";
import {useEffect, useState} from "react"
import Axios from "axios"
import {useNavigate} from "react-router-dom"
import useSWR from "swr"
import Loading from "../modals/Loading"

export default function Search(){
const [topKrypt, setTopKrypt] = useState([])
const [profiles, setProfiles] = useState([])
const [searchValue, setSearchValue] = useState("")


const navigate = useNavigate()


const fetcher = (...args) => fetch(...args).then(res => res.json())

const { data, error } = useSWR('https://sleepy-escarpment-55626.herokuapp.com/search', fetcher)
console.log(data)

  if (error) return <div>failed to load</div>
  if (!data) return <div><Loading /></div>



console.log(topKrypt)
console.log(searchValue)


const handleSubmit = (e) =>{
   e.preventDefault()
    const payload = {searchValue}
    
   const endPoint = searchValue.toLowerCase()
console.log(payload)
    Axios.post("https://sleepy-escarpment-55626.herokuapp.com/search", payload)
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
    search:"fill-primary"
}

    const search = "Search"
    return(
        <div className="bg-secondary-600 w-full h-screen flex flex-col items-center mb-12">
          <Header
          title={search} />

           <form onSubmit={handleSubmit} className="flex justify-between w-full px-4 mb-2 h-8 fixed top-14">
            <input type="text" onChange={(e)=>setSearchValue(e.target.value)} value={searchValue} className="text-white shadow-inner border-hidden drop-shadow-2xl w-full bg-secondary-500 rounded-full placeholder:text-gray-500 placeholder:text-sm placeholder:px-2 active:border-white active:border-2;" placeholder="search username or krypt"/>
            </form>
            <div className="mt-24 bg-secondary-600 w-full">
            <p className="text-secondary-700 px-4">Top Dekrypters</p>
            <Trending 
                profiles={data.topKrypters}
            />
            </div>
         
             <div className="w-full px-2 mt-2 pb-16 bg-secondary-600">
                <p className="text-secondary-700 px-4 py-2">Top Krypts</p>
                {data.topKrypts.reverse().map(homedata=> <Timebox
                   title={homedata.title}
                username={homedata.creator.username}
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
                search={navcolor.search}
                user={data.user}
        />
        </div>
    )
}
