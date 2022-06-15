import {ReactComponent as Loader} from "../svg/loading.svg"
import {ReactComponent as Done} from "../svg/done.svg"

export default function Loading ({success}){


    return (
        <div className="modal-base">
        <div className="modal-block bg-primary">  {success ? <> <Done /> <span className="ml-4 py-2"> file uploaded </span> </> : <> <div className="w-16 h-16 animate-bounce rounded-full bg-white"> </div>  <span className="ml-4 py-2"> uploading...</span></>} </div>
        </div>
    )
}
