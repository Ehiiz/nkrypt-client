export default function QuizAnswerBox({Question, Number, index, handleChange, answer}){



    return(
        <section className="w-full text-white flex flex-col black pt-16 px-4" key={index}>
        <p className="multi-num">{Number}</p>
        <p className="text-white text-md">{Question}</p>
        <div className="flex flex-col">
        <input value={answer} onChange={e => handleChange(index, e)}  className="quest mt-3 border-white border-2" type="text" name="answer" placeholder="Type in your answer" 
         />
        <label className="self-end pr-2" htmlFor="ans">Answer</label>
        </div>
        </section>
    )
}