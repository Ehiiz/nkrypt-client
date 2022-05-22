import {ReactComponent as Facebook} from "../svg/Facebook logo 2019.svg";
import {ReactComponent as Whatsapp} from "../svg/Whatsapp.svg";
import {ReactComponent as Twitter} from "../svg/Twitter.svg";
import {ReactComponent as Copy} from "../svg/fluent_document-copy-24-filled.svg"
import {Link, useParams} from "react-router-dom"

export default function Share(){

    const {id} = useParams();

    return(
        <div className="flex text-white items-center italic w-full">
        <Link to={`/krypt/${id}`} className="mr-4 text-xs font-light flex flex-col items-center">
       <Twitter />
        <p>share</p>
        <p>twitter</p>
        </Link>
        <Link to={`/krypt/${id}`} className="share-sec">
       <Facebook />
        <p>share</p>
        <p>facebook</p>
        </Link>
        <Link to={`/krypt/${id}`} className="share-sec">
       <Whatsapp />
        <p>share</p>
        <p>whatsapp</p>
        </Link>
        <Link to={`/krypt/${id}`}className="share-sec">
        <Copy />
        <p>copy</p>
        <p>link</p>
        </Link>
    </div>
    )
}