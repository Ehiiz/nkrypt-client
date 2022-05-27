import {ReactComponent as Loader} from "../svg/loading.svg"
import {ReactComponent as Done} from "../svg/done.svg"

export default function Loading ({success}){


    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50">
        <div className="absolute top-1/4 left-2/4 opacity-100 -translate-x-2/4 -translate-y-4 z-50 bg-primary text-white text-md drop-shadow-2xl justify-center self-center flex flex-col items-center rounded-2xl w-48 h-36 py-4 px-4 font-bold">  {success ? <> <Done /> <span className="ml-4 py-2"> file uploaded </span> </> : <> <Loader/>  <span className="ml-4 py-2"> uploading...</span></>} </div>
        </div>
    )
}