import {ReactComponent as Play} from "../svg/Play.svg";

export default function Audio({addAudio}){

    return (
        <button className="add-bttn"  onClick={addAudio}>
        <Play />
        <p>Audio</p>
    </button>
    )
}