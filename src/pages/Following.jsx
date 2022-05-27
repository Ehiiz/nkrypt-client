import Axios from 'axios';
import {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom"
import Header from '../core-components/Header';
import Nav from '../core-components/Nav';

export default function Following(){

const {id} = useParams();
   
const [userfollowing, setUserFollowing] = useState([])
const [user, setUser] = useState({})
const [profollowing, setProfollowing] = useState([])

   useEffect(() => {
    Axios.get(`/following/${id}`)
    .then(res =>{
        console.log(res);
        // setUserFollowing(res.data.following)
    })



   },[])
   
    const navcolor = {
        home:"fill-secondary-900",
        notification:"fill-secondary-900",
        profile:"fill-primary",
    }

    const following = "Following"
    return (
        <div>
            <div className="h-screen scrollbar-hide bg-secondary-600">
        <Header 
            title={following}
        />
        <div className="h-fit bg-secondary-600 mt-16">
        {userfollowing.map(usefollow=>{
            <div className="mt-8 pt-1 mb-4 pb-2 px-2 bg-secondary-600 flex justify-between"> 
              <div className="flex flex-col">
              <div className="w-16">
              <img src={usefollow.image} />
              </div>
                  <p className="text-secondary-400">{usefollow.username}</p>
              </div>
              <p className="profi2">Follow</p>
                 <hr />
                </div>
        })}
      

        </div>

        
        <Nav 
            home={navcolor.home}
            notification={navcolor.notification}
            profile={navcolor.profile}
            user={user._id}
        />


        </div>
        </div>
    )

}