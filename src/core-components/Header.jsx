import Logo from "./Logo";

export default function Header({title}){

    return(
        <div className="head">
            <h2 className="font-bold text-base text-white">{title}</h2>
            <Logo />
        </div>
    )
}