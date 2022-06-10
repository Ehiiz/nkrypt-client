import {ReactComponent as Chat} from "../svg/Chat.svg"
import ProfileSix from "../img/Rectangle 47.png";

export default function Comments({username, comment, image, time}){

return(
    <div className="w-full mt-4 px-3">
    <div className="flex w-full items-center">
        <div className="mr-4">
        <img src={image} alt='my profile' className="img-com"/>
        </div>
         <div>
         <p className="text-secondary-400 text-sm mb-1 font-light">@{username}</p>
         <p className="text-secondary-900 text-sm">{comment}</p>
         </div>
    </div>
    <div className="flex justify-between text-secondary-900">
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