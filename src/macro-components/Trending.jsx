import Kryptprofile from "../micro-components/Kryptprofile";
import ProfileOne from "../img/Rectangle 42.png";
import ProfileTwo from "../img/Rectangle 43.png";
import ProfileThree from "../img/Rectangle 44.png";
import ProfileFour from "../img/Rectangle 45.png";
import ProfileFive from "../img/Rectangle 46.png";
import ProfileSix from "../img/Rectangle 47.png";
import ProfileSeven from "../img/Rectangle 48.png";
import ProfileEight from "../img/Rectangle 49.png";
import ProfileNine from "../img/Rectangle 50.png";

export default function Trending(){

    const profileDetails = [
        {
            image : ProfileOne, 
            username : '@ahm_ehiz',
    
        },
        {
            image : ProfileTwo,  
            username : '@juga',
    
        },
        {
            image : ProfileThree, 
            username : '@crazilee',
    
        },
        {
            image : ProfileFour,  
            username : '@tamiyu',
    
        },
        {
            image : ProfileFive, 
            username : '@kazzi',
    
        },
        {
            image : ProfileSix,  
            username : '@puffboy',
    
        },
        {
            image : ProfileSeven, 
            username : '@mojojo',
    
        },
        {
            image : ProfileEight, 
            username : '@kpekenle',
    
        },
        {
            image : ProfileNine, 
            username : '@tomisoon',
    
        },
        {
            image : ProfileOne, 
            username : '@blanche',
    
        },
        {
            image : ProfileNine, 
            username : '@caserita',
    
        },
        {
            image : ProfileSix, 
            username : '@seunowa',
    
        },
        {
            image : ProfileThree, 
            username : '@fofo1',
    
        },   {
            image : ProfileFour, 
            username : '@timmytuna',
    
        },   {
            image : ProfileOne, 
            username : '@savvy',
    
        },   {
            image : ProfileTwo, 
            username : '@garcia',
    
        },
]

const boxstyle = "home-box"
const imgstyle = "home-image"
const textsize = "text-sm"


    return(
        <div className="bg-secondary-600 flex overflow-x-scroll scrollbar-hide mt-16 px-2 pb-4">
         {profileDetails.map(profile => <Kryptprofile
            image={profile.image}
            username={profile.username}
            boxstyle={boxstyle}
            imgstyle={imgstyle}
            textsize={textsize}
         />)}
            
        </div>
    )
}