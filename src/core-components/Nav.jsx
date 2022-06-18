import {Link} from "react-router-dom";
export default function Nav({home, notification, profile, user, search}){


    


    return(
        <nav className="flex text-xs items-end pb-3 justify-evenly mt-4 fixed bottom-0 left-0 right-0 bg-secondary-600 pt-3">
            <div className="nav-block">
            <Link to="/home" className="nav">          
             <svg width="25" height="30" viewBox="0 0 36 38" className={`${home}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M12.3171 35.0159V29.3591C12.3171 27.9151 13.4913 26.7445 14.9396 26.7445H20.2342C20.9297 26.7445 21.5968 27.0199 22.0886 27.5103C22.5804 28.0006 22.8567 28.6657 22.8567 29.3591V35.0159C22.8523 35.6162 23.0884 36.1935 23.5127 36.6195C23.9369 37.0456 24.5142 37.2852 25.1164 37.2852H28.7285C30.4155 37.2895 32.035 36.6245 33.2294 35.4367C34.4239 34.2489 35.0952 32.6361 35.0952 30.9542V14.8389C35.0952 13.4803 34.4911 12.1915 33.4458 11.3198L21.1578 1.53557C19.0203 -0.179943 15.9577 -0.124554 13.884 1.66713L1.87649 11.3198C0.781781 12.1658 0.127487 13.4584 0.0951538 14.8389V30.9377C0.0951538 34.4433 2.94559 37.2852 6.46179 37.2852H9.99148C11.2422 37.2852 12.2586 36.2792 12.2676 35.0323L12.3171 35.0159Z"/>
            </svg>
                {/* <p className="text-xs mt-1">home</p> */}
                </Link>
            </div>
            <div className="nav-block">
            <Link to="/search" className="nav">
            <svg width="25" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={search}>
            <path d="M31.2414 31.3086C32.0145 30.5408 33.2537 30.5408 34.0267 31.3086L39.136 35.4328H39.2247C40.2584 36.4776 40.2584 38.1716 39.2247 39.2164C38.1911 40.2612 36.5151 40.2612 35.4814 39.2164L31.2414 34.3569L31.0805 34.1754C30.7808 33.796 30.6153 33.323 30.6153 32.8327C30.6153 32.2608 30.8406 31.7123 31.2414 31.3086ZM17.1553 0C21.7051 0 26.0687 1.82687 29.2859 5.07873C32.5031 8.33058 34.3106 12.741 34.3106 17.3399C34.3106 26.9164 26.6299 34.6797 17.1553 34.6797C7.68068 34.6797 0 26.9164 0 17.3399C0 7.76332 7.68068 0 17.1553 0Z"/>
            </svg>
             {/* <p className="mt-1 text-xs" >search</p> */}
            </Link>
            </div>
            <div className="nav-block">
            <Link to="/notifications" className="nav">
            <svg width="25" height="30" viewBox="0 0 31 36" className={`${notification}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5008 30.5236C12.383 30.3385 17.7586 30.3385 18.6408 30.5236C19.3949 30.6963 20.2105 31.0999 20.2105 31.9812C20.1667 32.8202 19.6703 33.5639 18.9845 34.0363C18.0953 34.7237 17.0518 35.159 15.9609 35.3159C15.3575 35.3935 14.7647 35.3952 14.1824 35.3159C13.0898 35.159 12.0462 34.7237 11.1588 34.0345C10.4712 33.5639 9.9749 32.8202 9.93105 31.9812C9.93105 31.0999 10.7466 30.6963 11.5008 30.5236ZM15.175 0.374725C18.8458 0.374725 22.5956 2.10201 24.823 4.96789C26.2682 6.81326 26.9312 8.65687 26.9312 11.5228V12.2683C26.9312 14.4662 27.517 15.7616 28.8061 17.2545C29.783 18.3543 30.0952 19.7661 30.0952 21.2978C30.0952 22.8276 29.5883 24.28 28.5728 25.4591C27.2434 26.8727 25.3685 27.7751 23.455 27.9319C20.6821 28.1664 17.9075 28.3638 15.096 28.3638C12.2828 28.3638 9.50994 28.2457 6.73707 27.9319C4.82184 27.7751 2.94695 26.8727 1.61927 25.4591C0.603777 24.28 0.0951538 22.8276 0.0951538 21.2978C0.0951538 19.7661 0.409097 18.3543 1.38425 17.2545C2.71369 15.7616 3.26089 14.4662 3.26089 12.2683V11.5228C3.26089 8.57932 4.00103 6.65463 5.52515 4.77048C7.79115 2.02269 11.4234 0.374725 15.0171 0.374725H15.175Z"/>
            </svg>
                {/* <p className="text-xs mt-1">alerts</p> */}
            </Link>
            </div>
            <div className="nav-block">
            <Link to={`/profile/${user}`} className="nav">
            <svg width="25" height="30" viewBox="0 0 31 39" className={`${profile}`} xmlns="http://www.w3.org/2000/svg">
                <path d="M15.0952 25.763C23.2301 25.763 30.0952 27.1026 30.0952 32.2706C30.0952 37.4406 23.1851 38.7326 15.0952 38.7326C6.9621 38.7326 0.0951538 37.3931 0.0951538 32.225C0.0951538 27.0551 7.00524 25.763 15.0952 25.763ZM15.0952 0.732574C20.606 0.732574 25.0214 5.20522 25.0214 10.7856C25.0214 16.3659 20.606 20.8405 15.0952 20.8405C9.58621 20.8405 5.16893 16.3659 5.16893 10.7856C5.16893 5.20522 9.58621 0.732574 15.0952 0.732574Z"/>
                </svg>
                {/* <p className="text-xs mt-1" >profile</p> */}
            </Link>
             
            </div>
        </nav>
    )
}