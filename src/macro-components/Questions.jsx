import { useState } from "react"

export default function Questions({number}){
    

    const [questionCell, setQuestionCell] = useState({ques:"", ans:""})

    console.log(questionCell);
    const updateQuestionCell = (e) => {
        const {name, value} = e.target;
        setQuestionCell({...questionCell,   [name] : value} )
        console.log(value)

    }


    return(
        <section className="w-full text-white bg-secondary-600 flex flex-col black pt-16 px-4">
        <p className="multi-num">{number}</p>
        <div className="flex flex-col">
        <input className="quest shadow-md" type="text" name= "ques" placeholder="Type in your question" 
        value={questionCell.ques} 
        onChange={updateQuestionCell}/>
        <label className="self-end pr-2" htmlFor="ques">Question</label>
        </div>
        <div className="flex flex-col">
        <input className="quest mt-3" type="text" name="ans" placeholder="Type in your answer" 
        value={questionCell.ans} onChange={updateQuestionCell}/>
        <label className="self-end pr-2" htmlFor="ans">Answer</label>
        </div>
        </section>
    )
}