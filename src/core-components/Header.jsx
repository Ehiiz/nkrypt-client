import Logo from "./Logo";
import {Link} from "react-router-dom"

export default function Header({title}){

    return(
        <div className="head">
            <h2 className="font-bold text-base text-white">{title}</h2>
            <Link to="/"> <Logo /></Link>
           
        </div>
    )
}