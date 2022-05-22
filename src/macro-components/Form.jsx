import FormInput from "./microcomponents/FormInput";

export default function Form(){

const contacts =[
    {name: 'John', 
    email: 'email'
},

{name: 'Peter', 
email: 'Password'}
]


    return(
        <form action="">
        {contacts.map(contact => <FormInput
            name={contact.name}
            email={contact.email}
        />
        )}
           
        </form>
    )
}