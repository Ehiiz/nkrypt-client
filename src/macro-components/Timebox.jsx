import Boxicon from "../micro-components/Boxicon";
import Microicon from "../micro-components/Microicon";
import {ReactComponent as Exclaim} from "../svg/Exclamation Mark.svg";
import {ReactComponent as Achievement} from "../svg/Achievement.svg";
import {ReactComponent as Chat} from "../svg/uil_comments-alt.svg";
import {Link} from "react-router-dom";



export default function Timebox({username, title, date, time, success, failed, comments, id}){

    return (
        <Link className="timeline-box" to={`/krypt/${id}`}>
             <div className="flex justify-between mt-2">
            <Microicon 
             date={date}
             time={time}
            />
             <p className="text-xs text-secondary-700">{username}</p>
             </div>
            
            <div className="flex justify-between items-center pt-2">
            <p className="text-3xl text-white mb-4 mt-2">{title}</p>    

          <Boxicon />

            </div>
           
          <section className="flex justify-between">
            <div className="timecon">
          <Exclaim />
            {failed}
            </div>
            <div className="timecon">
              <Achievement />
          {success}  
            </div>
            <div className="timecon">
           <Chat />
           {comments}
            </div>
          </section>
        
             
        </Link>
    )
}