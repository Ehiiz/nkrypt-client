import {ReactComponent as Textfile} from "../svg/Text File.svg"
export default function Text({addText}){


    return  (
    <button className="add-bttn" onClick={addText}>
    <div className="mb-1">
    <Textfile />
    </div>
    <p>Text</p>
    </button>
    )
}