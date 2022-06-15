import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import Timebox from "../macro-components/Timebox";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Axios from 'axios';
import {useNavigate} from "react-router-dom";
import {ReactComponent as Ghost} from "../svg/Spooky Stickers Ghost.svg"
import useSWR from "swr"
import Fetching from "../modals/Fetching"
import { useCookies } from 'react-cookie';




export default function Home(){
const navigate = useNavigate();
const [modalCase, setModalcase] = useState(false)
const [user, setUser] = useState(undefined)

const fetcher = (...args) => fetch(...args).then(res => res.json())
const { data, error } = useSWR("https://sleepy-escarpment-55626.herokuapp.com/home", fetcher)
console.log(data)



useEffect(() => {
    const userid = localStorage.getItem("user")
            setUser(userid)
  
    if(data){
        console.log(data.data.length)
        if(data.data.token){
            const token = data.data.token
            localStorage.setItem('jwt', token);
            localStorage.setItem('user', data.data.id)
            setUser(data.data.id)
        } else {
            const userid = localStorage.getItem("user")
            setUser(userid)

        }
       
        if(data.data.length === 0){
                setModalcase(true)
            }
}
},[])

if (!data) return <Fetching />;
if (error) return  <p>Loading...</p>;












  

const navcolor = {
    home:"fill-primary",
    notification:"fill-secondary-900",
    profile:"fill-secondary-900",
    search:"fill-secondary-900"
}

const home = "Home"

    return(
        <div className="bg-secondary-600 h-screen">
  
      
     
            <Header 
                title = {home}
            />

           
             <div className="px-4 mb-18 pb-36 mt-16 h-fit bg-secondary-600">
           
            {data.data.reverse().map(homedata=> <Timebox
                   title={homedata.title}
               username={homedata.creator.username}
                   date={homedata.date}
                   time={homedata.time}
                   success={homedata.success}
                   failed={homedata.failure}
                   comments={homedata.comment} 
                   id={homedata._id}
                   key={homedata._id}
          />

          )} 
          {modalCase && <div>
                 <Ghost />
            
              <p>No krypts yet, create a krypt to get started</p>
          </div>} 

           
             </div>
            <Link to="/create">
            <button className="fixed bottom-20  right-6 shadow border-4 def-bttn flex"> 
           <svg className="mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.125 1.25C12.2466 1.2498 11.3804 1.45535 10.5958 1.85019C9.81115 2.24503 9.12991 2.81818 8.60666 3.5237C8.08342 4.22922 7.73271 5.0475 7.58264 5.91296C7.43257 6.77842 7.48732 7.66701 7.7425 8.5075L1.25 15V18.75H5L11.4925 12.2575C12.2662 12.4923 13.0814 12.5576 13.8826 12.4489C14.6838 12.3402 15.4522 12.06 16.1353 11.6275C16.8184 11.195 17.4003 10.6203 17.8412 9.94256C18.2822 9.26483 18.5718 8.5 18.6904 7.70021C18.8091 6.90041 18.7539 6.08444 18.5286 5.3079C18.3033 4.53137 17.9133 3.81252 17.3851 3.20035C16.8569 2.58818 16.203 2.09708 15.4678 1.76051C14.7326 1.42394 13.9335 1.24981 13.125 1.25V1.25ZM13.125 11.25C12.6947 11.2498 12.2668 11.1862 11.855 11.0612L11.1381 10.8438L10.6088 11.3731L8.62063 13.3613L7.75875 12.5L6.875 13.3837L7.73687 14.2456L6.74563 15.2369L5.88375 14.375L5 15.2587L5.86187 16.1206L4.4825 17.5H2.5V15.5175L8.62625 9.39125L9.15625 8.86187L8.93875 8.145C8.67161 7.26437 8.68897 6.32193 8.98834 5.45173C9.28772 4.58153 9.85388 3.82789 10.6063 3.29802C11.3587 2.76814 12.259 2.48901 13.1792 2.50033C14.0994 2.51165 14.9926 2.81285 15.7317 3.36107C16.4708 3.9093 17.0183 4.67664 17.2961 5.55394C17.574 6.43124 17.5682 7.37382 17.2795 8.24761C16.9907 9.12141 16.4338 9.88191 15.688 10.4209C14.9421 10.96 14.0453 11.2501 13.125 11.25V11.25Z" fill="#222227"/>
                <path d="M13.75 7.5C14.4404 7.5 15 6.94036 15 6.25C15 5.55964 14.4404 5 13.75 5C13.0596 5 12.5 5.55964 12.5 6.25C12.5 6.94036 13.0596 7.5 13.75 7.5Z" fill="#222227"/>
                </svg>
            Create Krypt
           </button>
           </Link>

            <Nav 
                home={navcolor.home}
                notification={navcolor.notification}
                profile={navcolor.profile}
                search={navcolor.search}
<<<<<<< HEAD
                user={user}
=======
                user={"62a374fcafcbd93ed7956d44"}
>>>>>>> ca05fe09cc8a8817b52815107effc9eb92d8458d
            />  
        </div>
    )
}
