import {Link} from "react-router-dom"
export default function Kryptprofile({image, id, username, imgstyle, boxstyle, textsize}){


    return(
        <Link to={`/profile/${id}`} className="flex flex-col items-center w-36">
        <div className={`${boxstyle}`}>
        <img className={`${imgstyle}`} src={image} alt="user-profile"/>
        </div>
        <p className={`${textsize} text-secondary-400` }>{username}</p>
        </Link>
      
    )
}