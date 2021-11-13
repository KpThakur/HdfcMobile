import React, { useContext, useEffect, useState } from "react";
import { Share } from 'react-native';
import QuestionView from './components/Question';
import { QuestionContext } from '../../../utils/QuestionContext'
import { apiCall } from "../../../utils/httpClient";
import apiEndPoints from "../../../utils/apiEndPoints";
import Loader from '../../../utils/Loader'
import Notify from "../Notify";
const Question = ({ navigation }) => {
    const [question, setquestion] = useContext(QuestionContext)
    const [remark, setremark] = useState("")
    const [rating, setrating] = useState(0)
    const [rmmactionable, setrmmactionable] = useState(0)
    const [bmActionable, setbmActionable] = useState(0)
    const [questionList, setquestionList] = useState()
    const [yesNo, setyesNo] = useState()
    const [quality, setquality] = useState(0)
    const [checkedAns, setcheckedAns] = useState("")
    const [camImg, setCamImg] = useState('')
    const [sliderValue, setSliderValue] = useState('')
    const [reviewValue, setReviewValue] = useState(0);
    const [isLoading, setisLoading] = useState(false)
    const [startAudit, setstartAudit] = useState()
    const [joined, setjoined] = useState(true)
 const [managerJoin, setmanagerJoin] = useState(true)
    useEffect(() => {
       setstartAudit(question.audit_type==0?true:false)
    //    setjoined(question.audit_type==1?true:false)
    //    setmanagerJoin(question.audit_type==1?true:false)
    }, [])
    console.log(startAudit)
    const SubmitAPI = async (formdata) => {
        try {
            setisLoading(true)
            const response = await apiCall('POST', apiEndPoints.SUBMIT_QUESTION, formdata,
                {
                    'Content-Type': 'multipart/form-data'
                })
            setisLoading(false)
            // console.log("SNBMIT:",response.data)
            if (response.data.status === 200) {
                handleNext()
            }
            else {
                console.log(response.data)
                alert(response.data.message)
            }
        } catch (error) {
            console.log("ERROR: ", error)
        }
    }
    const handleSubmit = async () => {

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
        console.log("HH", question.data.question_type === "3")

        if (question.data.question_type === "3" || question.data.image_capture === "1") {
            if (camImg) {
                camImg?.map((img, index) => {
                    return (
                        formdata.append('question_image', {
                            uri: img.path,
                            type: img.mime === undefined ? "image/jpeg" : img.mime,
                            name: img.path.substring(img.path.lastIndexOf('/') + 1),
                        })
                    )
                })
                SubmitAPI(formdata)
            }
            else {
                alert("Please Capture The Image")
            }
        }
        else {
            SubmitAPI(formdata)
        }
        console.log('formdata', formdata)
    }


    const handleNext = async () => {
        try {

            setisLoading(true)
            const params = {
                question_id: question.data.question_id,
                audit_id: question.audit_id,
                audit_type:question.audit_type
            }
            const response = await apiCall('POST', apiEndPoints.QUESTION, params)
            setisLoading(false)
            if (response.status === 200) {
                if (response.data.data.check_data)
                    setquestionList(response.data.data.check_data.split(','))
                // setSliderValue(response.data.data)
                setquestion({ data: response.data.data, audit_id: params.audit_id,audit_type:params.audit_type })
                setremark("")
                setrmmactionable(0)
                setbmActionable(0)
                setCamImg()
                setyesNo()
                setquality(0)
                setReviewValue(0)
                setcheckedAns("")

            }
            else {
                //Complete
                const params = {
                    audit_id: question.audit_id,
                    audit_status: 5
                }
                const response = await apiCall('POST', apiEndPoints.CANCEL_AUDIT, params)
                if (response.status === 200)
                    navigation.navigate('AuditScore')
                else
                    navigator.navigate('DashboardScreen')
            }
        } catch (error) {
            console.log("ERROR: ", error)
        }
    }
    console.log("QUES", question)
    return (
        <>
            {isLoading && <Loader />}
        
            <QuestionView
                question={question}
                setquestion={setquestion}
                remark={remark} setremark={setremark}
                rating={rating} setrating={setrating}
                rmmactionable={rmmactionable} setrmmactionable={setrmmactionable}
                bmActionable={bmActionable} setbmActionable={setbmActionable}
                questionList={questionList}
                yesNo={yesNo} setyesNo={setyesNo}
                quality={quality} setquality={setquality}
                checkedAns={checkedAns}
                setcheckedAns={setcheckedAns}
                handleSubmit={handleSubmit}
                camImg={camImg}
                setCamImg={setCamImg}
                sliderValue={sliderValue}
                reviewValue={reviewValue}
                setReviewValue={setReviewValue}
                startAudit={startAudit} setstartAudit={setstartAudit}
                joined={joined} setjoined={setjoined}
                managerJoin={managerJoin} setmanagerJoin={setmanagerJoin}
            />
           
        </>
    )
}
export default Question;
