import ProfileSix from "../img/Rectangle 47.png";
import Axios from "axios";

export default function Userpic({createImage}){



    return (
        <div className="modal-base">
        
        <div className="w-96 h-96 rounded-full absolute top-1/4 left-2/4 opacity-100 -translate-x-2/4 -translate-y-4 z-50 text-white shadow-inner drop-shadow-2xl  font-bold bg-none object-contain">
     <p className="self-center relative left-12 text-secondary-900 font-semibold text-lg">click to select a profile picture</p>
      <div className="w-full object-contain relative top-12 left-8">
      <div className="inline-flex px-1 relative right-2 top-6">
           <img onClick={e => createImage(e)} src="https://res.cloudinary.com/djnkzrito/image/upload/v1653646973/profile_4_baai0e.jpg" alt="user-pic" className="w-28 rounded-full border-2 border-white;" />
       </div>
       <div className="inline-flex px-1 relative right-6 bottom-10">
           <img onClick={e => createImage(e)} src="https://res.cloudinary.com/djnkzrito/image/upload/v1653646973/profile_2_tqjols.jpg" alt="user-pic" className="w-28 rounded-full border-2 border-white;" />
       </div>
       <div className="inline-flex px-1 relative right-9 top-5">
           <img onClick={e => createImage(e)} src="https://res.cloudinary.com/djnkzrito/image/upload/v1653646972/profile_3_sqxyyw.jpg" alt="user-pic" className="w-28 rounded-full border-2 border-white;" />
       </div>
       <div className="inline-flex px-1 left-24 bottom-10 relative">
           <img onClick={e => createImage(e)} src="https://res.cloudinary.com/djnkzrito/image/upload/v1653646972/profile_7_ebm8mg.jpg" alt="user-pic" className="w-28 rounded-full border-2 border-white;" />
       </div>
       <div className="inline-flex py-1  right-28 top-10 relative">
           <img onClick={e => createImage(e)} src="https://res.cloudinary.com/djnkzrito/image/upload/v1653646971/profile_9_kxszut.jpg" alt="user-pic" className="w-28 rounded-full border-2 border-white;" />
       </div>
       <div className="inline-flex py-1  right-28 top-20 relative">
           <img onClick={e => createImage(e)} src="https://res.cloudinary.com/djnkzrito/image/upload/v1653646969/profile_10_ypmcmm.jpg" alt="user-pic" className="w-28 rounded-full border-2 border-white;" />
       </div>
       <div className="inline-flex py-1 left-56 bottom-28 relative">
           <img onClick={e=> createImage(e)} src="https://res.cloudinary.com/djnkzrito/image/upload/v1653646972/profile_8_j4d6ah.jpg" alt="user-pic" className="w-28 rounded-full border-2 border-white;" />
       </div>
      </div>
       
     
       </div>
        </div>
    )
}