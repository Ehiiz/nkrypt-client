import {ReactComponent as Facebook} from "../svg/Facebook logo 2019.svg";
import {ReactComponent as Whatsapp} from "../svg/Whatsapp.svg";
import {ReactComponent as Twitter} from "../svg/Twitter.svg";
import {ReactComponent as Google} from "../svg/Google.svg";
import {Link} from "react-router-dom"


export default function Socials(){

    const google = ()=>{
      window.open(`http://localhost:4000/auth/google`, "_self")  
    }

    
    const facebook = ()=>{
        window.open(`http://localhost:4000/auth/facebook`, "_self")  
      }

      const twitter = ()=>{
        window.open(`http://localhost:4000/auth/twitter`, "_self")  
      }

    return(
        <div className="flex text-white items-center">
            <p className="mr-4">Login with</p>
            <div onClick={twitter} className="cursor-pointer mr-4">
           <Twitter />
            </div>
            <div onClick={facebook} className="cursor-pointer mr-4">
           <Facebook />
            </div>
            <div className="cursor-pointer mr-4">
            <div onClick={google}>
            <Google />
            </div>
            </div>
        </div>
    )
}