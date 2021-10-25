import React from "react";
import { Share } from 'react-native';
import QuestionView from './components/Question';
const Question = ({navigation}) => {
    const handleNext=()=>{
        navigation.navigate("Question3Screen")
    }
    return (
        <QuestionView handleNext={handleNext}
        />
    )
}
export default Question;
