import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import Share from "../macro-components/Share";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect,  useState} from "react"
import Axios from 'axios';
import useSWR from "swr"


export default function Success(){
    const navigate = useNavigate();
    const {id} = useParams();

    const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error } = useSWR(`https://sleepy-escarpment-55626.herokuapp.com/share/${id}`, fetcher)
console.log(data)


  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  

   
 
    const navcolor = {
        home:"fill-secondary-900",
        notification:"fill-secondary-900",
        profile:"fill-secondary-900",
        search:"fill-secondary-900",
    }

    
    
    return(
        <div className="page">
            <Header />
            <section className="flex flex-col items-center mt-48">
            <div className="suc-box">
            <p className="text-white text-sm mb-4">You have successfully created a Krypt, share to get your friends to engage</p>
        <p className="text-secondary-400 italic underline font-light text-xs">{`localhost:3000/${id}`}</p>
         <div className="mt-8">
         <Share />

         </div>
        
            </div>

            </section>
           
           
            <Nav 
                home={navcolor.home}
                notification={navcolor.notification}
                profile={navcolor.profile}
                search={navcolor.search}
                user={data.user._id}
            />
        </div>
    )
}
