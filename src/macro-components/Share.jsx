import {ReactComponent as Facebook} from "../svg/Facebook logo 2019.svg";
import {ReactComponent as Whatsapp} from "../svg/Whatsapp.svg";
import {ReactComponent as Twitter} from "../svg/Twitter.svg";
import {ReactComponent as Copy} from "../svg/fluent_document-copy-24-filled.svg"
import {useParams} from "react-router-dom"

export default function Share(){

    const {id} = useParams();
    const message = "Challenge%20yourself%20with%20this%20krypt"

    return(
        <div className="flex text-white items-center italic w-full">
        <a href={`https://twitter.com/intent/tweet?text=${message}%20https://nkrypt-client.vercel.app/krypt/${id}`} target="_blank" rel="noreferrer" className="mr-4 text-xs font-light flex flex-col items-center">
       <Twitter />
        <p>share</p>
        <p>twitter</p>
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fnkrypt-client.vercel.app%2Fkrypt%2F${id}`} target="_blank" rel="noreferrer" className="share-sec">
       <Facebook />
        <p>share</p>
        <p>facebook</p>
        </a>
        <a href={`whatsapp://send?text=${message}%20https://nkrypt-client.vercel.app/krypt/${id}`} target="_blank" rel="noreferrer" className="share-sec">
       <Whatsapp />
        <p>share</p>
        <p>whatsapp</p>
        </a>
        <div onClick={() => navigator.clipboard.writeText(`https://nkrypt-client.vercel.app/krypt/${id}`)} className="share-sec">
        <Copy />
        <p>copy</p>
        <p>link</p>
        </div>
    </div>
    )
}