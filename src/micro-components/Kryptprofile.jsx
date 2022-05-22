
export default function Kryptprofile({image, username, imgstyle, boxstyle, textsize}){


    return(
        <div className="flex flex-col items-center w-36">
        <div className={`${boxstyle}`}>
        <img className={`${imgstyle}`} src={image} alt="user-profile"/>
        </div>
        <p className={`${textsize} text-secondary-400` }>{username}</p>
        </div>
      
    )
}