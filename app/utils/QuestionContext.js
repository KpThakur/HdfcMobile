import React,{useState} from 'react'
export const QuestionContext=React.createContext()
export const QuestionProvider=(props)=>{
    const [question, setquestion] = useState()
    return (
        <QuestionContext.Provider value={[question,setquestion]}>
            {props.children}
        </QuestionContext.Provider>
    )
}