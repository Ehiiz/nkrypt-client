export default function FormInput({type, placeholder,name}){

    return(
        <div className="w-full mb-4">
            <input className="form" type={type} placeholder={placeholder}/>
            <label className="text-sm block text-white" htmlFor="">{name}</label>
        </div>
    )
}