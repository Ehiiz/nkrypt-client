import {ReactComponent as Chat} from "../svg/Chat.svg"
import {Link} from "react-router-dom"

export default function Comments({username, comment, image, time, id}){

return(
    <div className="w-full mt-4 px-3">
    <div className="flex flex-col w-full">
        <div className="flex w-full items-center pb-2">
            <div className="mr-2">
            <img src={image} alt='my profile' className="img-com"/>
            </div>
             <div>
             <a href={`https://nkrypt.vercel.app/profile/${id}`} className="text-secondary-400 text-sm mb-1 font-light">@{username}</a>
             </div>
        </div>
        <p className="text-secondary-900 text-sm">{comment}</p>
    </div>
  
    <div className="flex justify-between text-secondary-900 mt-1">
      <p>{time}</p>
      <div className="flex items-center invisible">
      <Chat />
       <p className="text-xs ml-1 ">reply</p>
     </div>
    </div>
    <hr className="text-secondary-900 mt-4"/>
 </div>
)

}