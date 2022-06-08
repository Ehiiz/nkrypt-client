import {ReactComponent as Close} from "../svg/close.svg"

export default function Updatebio({userbio, biomessage, userbioSubmit, bioChange, closeModal}){



    return(
        <div className="modal-base">
        
        <div className="w-96 h-84 absolute top-1/4 left-2/4 opacity-100 -translate-x-2/4 -translate-y-4 z-50 text-white drop-shadow-2xl justify-center self-center flex flex-col items-center rounded-2xl py-4 px-4 font-bold bg-secondary-600">
        <button onClick={closeModal} className="text-xl py-2 px-2 shadow-xl self-end rounded-full bg-secondary-100 text-secondary-500"><Close /></button>
        <label htmlFor="bio" className="text-lg text-secondary-300 font-semibold pb-4">Tell us a thing about you</label>
        <textarea className="create-area" cols="30" rows="7" placeholder="" type="text" value={userbio} onChange={(e) => bioChange(e)}/>
        <p className={"text-secondary-800 text-sm"}>{biomessage}</p>
        <button className="text-white text-xl bg-primary py-2 px-6 font-semibold rounded-xl w-fit mt-4" onClick={userbioSubmit}>Submit</button>
        </div>
        </div>
    )
}