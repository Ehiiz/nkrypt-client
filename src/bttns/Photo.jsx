import {ReactComponent as Gallery} from "../svg/gallery.svg";

export default function Photo({addImage}){


    return (
        <button className="add-bttn" onClick={addImage}>
          <div className="mb-1">
          <Gallery />
          </div>
            <p>Image</p>
        </button>
    )
}