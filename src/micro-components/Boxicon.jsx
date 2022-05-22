import {ReactComponent as MiniChat} from "../svg/Chatgreen.svg"

export default function Boxicon(){


    return(
        <section className="flex items-end">
                <div className="box-sec">
                 <div className="self-center">
                 <svg classsName="" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83325 8.33332V5.83332C5.83325 4.72825 6.27224 3.66845 7.05364 2.88704C7.83504 2.10564 8.89485 1.66666 9.99992 1.66666C11.105 1.66666 12.1648 2.10564 12.9462 2.88704C13.7276 3.66845 14.1666 4.72825 14.1666 5.83332C14.1666 6.29166 13.7916 6.66666 13.3333 6.66666C12.8749 6.66666 12.4999 6.29166 12.4999 5.83332C12.4999 5.17028 12.2365 4.5344 11.7677 4.06556C11.2988 3.59672 10.663 3.33332 9.99992 3.33332C9.33688 3.33332 8.70099 3.59672 8.23215 4.06556C7.76331 4.5344 7.49992 5.17028 7.49992 5.83332V8.33332H14.9999C15.4419 8.33332 15.8659 8.50892 16.1784 8.82148C16.491 9.13404 16.6666 9.55796 16.6666 9.99999V16.6667C16.6666 17.1087 16.491 17.5326 16.1784 17.8452C15.8659 18.1577 15.4419 18.3333 14.9999 18.3333H4.99992C4.55789 18.3333 4.13397 18.1577 3.82141 17.8452C3.50885 17.5326 3.33325 17.1087 3.33325 16.6667V9.99999C3.33325 9.55796 3.50885 9.13404 3.82141 8.82148C4.13397 8.50892 4.55789 8.33332 4.99992 8.33332H5.83325ZM4.99992 9.99999V16.6667H14.9999V9.99999H4.99992ZM11.6666 11.6667H13.3333V15H11.6666V11.6667Z" fill="#FFC600"/>
                 </svg>
                 </div>
             <p className ="self-center text-xs">unkrypt</p>
             </div> 

             <div className="text-secondary-800 flex flex-col w-fit mr-2"> 
             <div className="self-center">
             <MiniChat />
             </div>
             <p className ="self-center text-xs">comments</p>
             </div>
       
        </section>
       
    )
}