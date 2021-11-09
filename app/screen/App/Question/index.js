import React, { useContext, useEffect, useState } from "react";
import { Share } from 'react-native';
import QuestionView from './components/Question';
import { QuestionContext } from '../../../utils/QuestionContext'
import { apiCall } from "../../../utils/httpClient";
import apiEndPoints from "../../../utils/apiEndPoints";
const Question = ({ navigation }) => {
    const [question, setquestion] = useContext(QuestionContext)
    const [remark, setremark] = useState()
    const [rating, setrating] = useState()
    const [rmmactionable, setrmmactionable] = useState(0)
    const [bmActionable, setbmActionable] = useState(0)
    const [questionList, setquestionList] = useState()
    const [yesNo, setyesNo] = useState()
    const [quality, setquality] = useState()
    const [checkedAns, setcheckedAns] = useState()
    console.log('checkedAns: ', checkedAns);
    const [camImg, setCamImg] = useState('')
    const [sliderValue, setSliderValue] = useState('')

    const [reviewValue, setReviewValue] = useState(0);

    const handleSubmit = async () => {
        // const params={
        //     audit_id:question.audit_id,
        //     question_id:question.data.question_id,
        //     remark:remark,
        //     score_range:rating,
        //     rmm_actionable_assignee:rmmactionable,
        //     bm_actionable_assignee:bmActionable,
        //     yes_no:yesNo,
        //     quality:quality,
        //     check_answer:checkedAns
        // }
        let formdata = new FormData();
        formdata.append('audit_id', question.audit_id);
        formdata.append('question_id', question.data.question_id);
        formdata.append('remark', remark);
        formdata.append('score_range', reviewValue);
        formdata.append('rmm_actionable_assignee', rmmactionable);
        formdata.append('bm_actionable_assignee', bmActionable);
        formdata.append('yes_no', yesNo);
        formdata.append('quality', quality);
        formdata.append('check_answer', checkedAns);
        // camImg && formdata.append('question_image', {
        //     uri: camImg?.path,
        //     type: camImg?.mime,
        //     name: camImg?.path.substring(camImg?.path.lastIndexOf('/') + 1),
        // })
        console.log('formdata', formdata)
        camImg?.map((img, index) => {
            return (
                formdata.append('question_image', {
                    uri: img.path,
                    type: img.mime === undefined ? "image/jpeg" : img.mime,
                    name: img.path.substring(img.path.lastIndexOf('/') + 1),
                })
            )
        })
        const response = await apiCall('POST', apiEndPoints.SUBMIT_QUESTION, formdata,
            {
                'Content-Type': 'multipart/form-data'
            })
    }


    const handleNext = async () => {
        handleSubmit()
        const params = {
            question_id: question.data.question_id,
            audit_id: question.audit_id
        }
        const response = await apiCall('POST', apiEndPoints.QUESTION, params)
        if (response.status === 200) {
            if (response.data.data.check_data)
                setquestionList(response.data.data.check_data.split(','))
            setSliderValue(response.data.data)
            setquestion({ data: response.data.data, audit_id: params.audit_id })

        }
        else {
            //Complete
            const params = {
                audit_id: question.audit_id,
                audit_status: 3
            }
            const response = await apiCall('POST', apiEndPoints.CANCEL_AUDIT, params)
            if (response.status === 200)
                navigation.navigate('AuditScore')
            else
                navigator.navigate('DashboardScreen')
        }
    }
    return (
        <>
            <QuestionView handleNext={handleNext}
                question={question} setquestion={setquestion}
                remark={remark} setremark={setremark}
                rating={rating} setrating={setrating}
                rmmactionable={rmmactionable} setrmmactionable={setrmmactionable}
                bmActionable={bmActionable} setbmActionable={setbmActionable}
                questionList={questionList}
                yesNo={yesNo} setyesNo={setyesNo}
                quality={quality} setquality={setquality}
                checkedAns={checkedAns}
                setcheckedAns={setcheckedAns}

                camImg={camImg}
                setCamImg={setCamImg}

                sliderValue={sliderValue}
                reviewValue={reviewValue}
                setReviewValue={setReviewValue}
            />
        </>
    )
}
export default Question;
