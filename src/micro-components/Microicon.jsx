export default function Microicon({date, time}){
 
    const today = new Date();
 const postTime =  today.getHours();
 const postMinutes = today.getMinutes();
 const postDate = today.getDay() + 1;
 const postYear = today.getFullYear();

 if (postMinutes <= 10) {
    var finalMinutes = `0${postMinutes}`
 }
 else{
      finalMinutes = postMinutes
 }


 var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

 const monthName = months[today.getMonth()];
 const displayTime = `${postTime}:${finalMinutes}`
 const displayDate = `${monthName}, ${postDate} ${postYear}`

    return(
       <div className="flex items-center text-secondary-700">  
       <div className="flex items-center mr-8">
       <div className="mr-2">
      <svg width="15" height="15" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.91667 4.58334H3.75V5.41667H2.91667V4.58334ZM8.75 2.5V8.33334C8.75 8.79167 8.375 9.16667 7.91667 9.16667H2.08333C1.86232 9.16667 1.65036 9.07887 1.49408 8.92259C1.3378 8.76631 1.25 8.55435 1.25 8.33334L1.25417 2.5C1.25417 2.04167 1.62083 1.66667 2.08333 1.66667H2.5V0.833336H3.33333V1.66667H6.66667V0.833336H7.5V1.66667H7.91667C8.375 1.66667 8.75 2.04167 8.75 2.5ZM2.08333 3.33334H7.91667V2.5H2.08333V3.33334ZM7.91667 8.33334V4.16667H2.08333V8.33334H7.91667ZM6.25 5.41667H7.08333V4.58334H6.25V5.41667ZM4.58333 5.41667H5.41667V4.58334H4.58333V5.41667Z" fill="#C4C4C4"/>
        </svg>
      </div>
      <p className="text-sm lowercase">{date}</p>
       </div>
      <div className="flex items-center">
      <div className="mr-2">
      <svg width="15" height="15" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.30298 1.86523H4.67798V5.34396L6.93605 6.41717L7.20435 5.85268L5.30298 4.949V1.86523Z" fill="#C4C4C4"/>
        <path d="M5 0.3125C2.41117 0.3125 0.3125 2.41117 0.3125 5C0.3125 7.58883 2.41117 9.6875 5 9.6875C7.58883 9.6875 9.6875 7.58883 9.6875 5C9.6875 2.41117 7.58883 0.3125 5 0.3125ZM5 9.0625C2.75635 9.0625 0.9375 7.24365 0.9375 5C0.9375 2.75635 2.75635 0.9375 5 0.9375C7.24365 0.9375 9.0625 2.75635 9.0625 5C9.0625 7.24365 7.24365 9.0625 5 9.0625Z" fill="#C4C4C4"/>
        </svg>
      </div>
      <p className="text-sm lowercase">{time}</p> 
      </div>
     
       </div>
    )
}