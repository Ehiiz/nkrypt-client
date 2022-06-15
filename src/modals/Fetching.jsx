import {ReactComponent as Done} from "../svg/done.svg"

export default function Fetching (){


    return (
        <div className="modal-base2">
        <div className="modal-block bg-primary"> <div className="w-16 h-16 animate-spin rounded-full bg-white"> </div> <span className="ml-4 py-2"> loading...</span></div>
        </div>
    )
}
