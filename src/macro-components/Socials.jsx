import {ReactComponent as Facebook} from "../svg/Facebook logo 2019.svg";
import {ReactComponent as Whatsapp} from "../svg/Whatsapp.svg";
import {ReactComponent as Twitter} from "../svg/Twitter.svg";

export default function Socials(){


    return(
        <div className="flex text-white items-center">
            <p className="mr-4">Login with</p>
            <div className="mr-4">
           <Twitter />
            </div>
            <div className="mr-4">
           <Facebook />
            </div>
            <div className="mr-4">
           <Whatsapp />
            </div>
        </div>
    )
}