import Header from "../core-components/Header";
import Nav from "../core-components/Nav";
import {Link, useParams, useNavigate} from "react-router-dom";
import QuizAnswerBox from "../macro-components/QuizAnswerBox";
import {ReactComponent as Key} from "../svg/carbon_password.svg"
import Axios from 'axios';
import {useEffect, useState} from 'react';


export default function AnswerQuiz(){

  const [answerQuiz, setAnswerQuiz] = useState([{question:""}])
  const [title, setTitle] = useState()
  const [userQuiz, setUserQuiz] = useState([{answer:""}])
  const [user, setUser] = useState({})
  
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() =>{
        Axios.get(`/q-unlock/${id}`)
        .then(function(response){
            console.log(response);
            setUser({...response.data.data.user})
            const newtitle = response.data.data.kryptDeets.title
            const questData = response.data.data.lockDeets.authenticate
            let answerRay = []
            for (let i = 0; i < questData.length; i++) {
             var newAns = {answer:""}
                answerRay.push(newAns)
            }
            setUserQuiz(answerRay)
            setAnswerQuiz(questData)
            setTitle(newtitle)
        })
        .catch(function (error) {
            // handle error
            console.log(error + " This did not get anything");
          })
          .then(function () {
            // always executed
          });  

    },[])


   

    const handleChange = (i,e) =>{
        const {name, value} = e.target
        let newMultibox = [...userQuiz];
        newMultibox[i][name] = value;
        setUserQuiz(newMultibox)
        console.log(userQuiz)
      }

      const handleSubmit = () => {

        const payload = {userQuiz}
        console.log(payload);
        Axios.post(`/q-unlock/${id}`, payload)
        .then(function (response){
          console.log(response);
          let status = response.data.status
          console.log(status);
          if (status === "success"){
            navigate(`/unlock/${id}`)
          } else if (status === "failure"){
           window.location.reload();
          }
        


        })
        .catch( function(error){
          console.log(error);
        })
        .then(function (){

        })
      }

    console.log(answerQuiz)
    console.log(userQuiz)
    
    const navcolor = {
        home:"fill-primary",
        notification:"fill-secondary-900",
        profile:"fill-secondary-900",
    }
 


    return(
        <div className="page">
        <Header />
        <section className="flex flex-col px-4 py-4 mt-12 fixed top-0 mb-8 w-full bg-secondary-600 h-full">
         <h2 className="self-end font-bold text-secondary-900 text-2xl"><span className="text-md font-bold">unlock</span> {title}</h2> 
    
        <section className="text-white overflow-auto scrollbar-hide  rounded-t-2xl flex flex-col bg-secondary-500 w-full mt-1 pt-4 px-4 pb-48 h-128">
          {answerQuiz.map((answerQ, index) => <QuizAnswerBox
            Question = {answerQ.question}
            Number = {index + 1}
            index ={index}
            handleChange= {handleChange}
            answer={userQuiz[index].answer}
             />
         )}
        
        </section>

       
          <button className="fixed bottom-20  right-6 shadow border-4 def-bttn flex" onClick={handleSubmit}> 
          <Key />
          <p className="ml-2">
          Unlock Krypt

          </p>  
           </button>
         
        
    
        </section>
    
       
        <Nav
               home={navcolor.home}
                    notification={navcolor.notification}
                    profile={navcolor.profile}
                    user={user._id}
             />
    
        </div>
    )
}