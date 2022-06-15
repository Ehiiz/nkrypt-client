import Kryptprofile from "../micro-components/Kryptprofile";

export default function Trending({profiles}){

const boxstyle = "home-box"
const imgstyle = "home-image"
const textsize = "text-xs"


    return(
        <div className="bg-secondary-600 flex overflow-x-scroll scrollbar-hide px-1 pt-3">
         {profiles.map(profile => <Kryptprofile
            image={profile.image}
            username={profile.username}
            boxstyle={boxstyle}
            imgstyle={imgstyle}
            textsize={textsize}
            id = {profile._id}
         />)}
            
        </div>
    )
}