import React, { useContext, useEffect, useState } from "react";
import { Alert, Platform, Share } from 'react-native';
import QuestionView from './components/Question';
import { QuestionContext } from '../../../utils/QuestionContext'
import { apiCall } from "../../../utils/httpClient";
import apiEndPoints from "../../../utils/apiEndPoints";
import Loader from '../../../utils/Loader'
import { socket } from "../../../utils/Client";
import { UserContext } from "../../../utils/UserContext";
import NetInfo from "@react-native-community/netinfo";
const Question = ({ navigation, route }) => {
    const [question, setquestion] = useContext(QuestionContext)
    const [remark, setremark] = useState("")
    const [rating, setrating] = useState(0)
    const [rmmactionable, setrmmactionable] = useState(0)
    const [bmActionable, setbmActionable] = useState(0)
    const [questionList, setquestionList] = useState()
    const [yesNo, setyesNo] = useState()
    const [quality, setquality] = useState(0)
    const [checkedAns, setcheckedAns] = useState("")
    const [camImg, setCamImg] = useState([])
    const [sliderValue, setSliderValue] = useState('')
    const [reviewValue, setReviewValue] = useState(0);
    const [isLoading, setisLoading] = useState(false)
    const [startAudit, setstartAudit] = useState()
    const [joined, setjoined] = useState(true)
    const [managerJoin, setmanagerJoin] = useState(true)
    const [userData, setuserData] = useContext(UserContext)

    useEffect(() => {
        setstartAudit(question.audit_type == 0 ? true : false)
        unsubscribe
    }, [])
    useEffect(() => {
    }, [question])
    useEffect(() => {
        socket.on("image-sent", (data) => {
            getIMG()
        })
    }, [])

    const unsubscribe = NetInfo.fetch().then(state => {
        // console.log("ME:",state.isConnected)
        setjoined(state.isConnected)
    })

    const SubmitAPI = async (formdata) => {
        try {
            setisLoading(true)
            const response = await apiCall('POST', apiEndPoints.SUBMIT_QUESTION, formdata,
                {
                    'Content-Type': 'multipart/form-data'
                })
            setisLoading(false)
            console.log("SNBMIT:", response.data)
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
        if (question.data.question_type === "3" || question.data.image_capture === "1") {
            if (camImg) {
                if (question.audit_type !== 1) {
                    camImg?.map((img, index) => {
                        return (
                            formdata.append('question_image', {
                                uri: img.path,
                                type: img.mime === undefined ? "image/jpeg" : img.mime,
                                name: img.path.substring(img.path.lastIndexOf('/') + 1),
                            })
                        )
                    })
                }
                else {

                }
                SubmitAPI(formdata)
            }
            else {
                alert("Please Capture The Image")
            }
        }
        else {
            SubmitAPI(formdata)
        }

    }

    const handleNext = async () => {
        try {

            // setisLoading(true)
            const params = {
                question_id: question.data.question_id,
                audit_id: question.audit_id,
                audit_type: question.audit_type,
                employee_id: userData.emp_id,
                branch_manager: question.branch_manager
            }
            socket.emit("getQuestionList", params, async (data) => {
                console.log("sock data ", data)
                await GetSocketData(data, params)

                // let response = data
                // // const response = await apiCall('POST', apiEndPoints.QUESTION, params)
                // setisLoading(false)
                // if (response.status === 200) {
                //     if (response.data.data.check_data)
                //         setquestionList(response.data.data.check_data.split(','))

                //     setquestion({ data: response.data.data, audit_id: params.audit_id, audit_type: params.audit_type ,branch_manager:params.branch_manager})
                //     setremark("")
                //     setrmmactionable(0)
                //     setbmActionable(0)
                //     setCamImg()
                //     setyesNo()
                //     setquality(0)
                //     setReviewValue(0)
                //     setcheckedAns("")

                // }
                // else {
                //     //Complete
                //     const params = {
                //         audit_id: question.audit_id,
                //         audit_status: 5
                //     }
                //     const response = await apiCall('POST', apiEndPoints.CANCEL_AUDIT, params)
                //     if (response.status === 200)
                //         navigation.navigate('AuditScore')
                //     else
                //         navigator.navigate('DashboardScreen')
                // }
            })
        } catch (error) {
            console.log("ERROR: ", error)
        }
    }
    const GetSocketData = async (data, params) => {
        console.log("STATUS:", data.status)
        if (data.status === 200) {
            if (data.data.check_data)
                setquestionList(data.data.check_data.split(','))
            // setSliderValue(response.data.data)
            console.log("DATA:", data)
            setquestion({ data: data.data, audit_id: params.audit_id, audit_type: params.audit_type, branch_manager: params.branch_manager })
            setremark("")
            setrmmactionable(0)
            setbmActionable(0)
            setCamImg()
            setyesNo()
            setquality(0)
            setReviewValue(0)
            setcheckedAns("")
            await socket.emit("checker", data)
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
    }

    const onCapture = async () => {
        try {
            const params = {
                audit_id: question.audit_id,
                question_id: question.data.question_id
            }
            socket.emit("captureImageRequest", params, (data) => {
                console.log("socket capIMGReq", data)
                if (data.status === 200) {
                    // setTimeout(getIMG(),4000)
                    // getIMG()
                }
            })
            // const response = await apiCall("POST", apiEndPoints.CAPTURE_IMG, params)
            // console.log(response)
            // if (response.status === 200) {
            //     // setTimeout(getIMG(),4000)
            //     getIMG()
            // }
        } catch (error) {
            console.log("ERROR", error)
        }

    }
    const getIMG = async () => {
        try {
            const params = {
                audit_id: question.audit_id,
                question_id: question.data.question_id,
            }
            socket.emit("getImagedata", params, (data) => {
                console.log("IMG:", data)
                getIMGSOCKET(data)
            })

            // const response = await apiCall("POST", apiEndPoints.IMG_DATA, params)
            // if (response.status === 200) {
            //     console.log("RES IMG:L ", response.data.data)

            //     let combineImg = camImg == null ? [] : [...camImg];
            //     combineImg.push({
            //         path: response.data.image,
            //         type: 'camera'
            //     })
            //     setCamImg(combineImg)
            // }
        } catch (error) {
            console.log("ERROR ", error)
        }
    }
    const getIMGSOCKET = async (data) => {
        // console.log("socket img",data)
        if (data.status === 200) {
            console.log("RES IMG:L ", data)
            let combineImg = await camImg == null ? [] : [...camImg];
            camImg.push({
                path: data.image,
                type: 'camera',
                image_name: data.image_name
            })
            setCamImg([...camImg])
        }
    }
    const handleManagerJoin = (data) => {
        console.log("MANAGER: ", data)
        setmanagerJoin(data)
    }

    const handleJoin = (data) => {
        // console.log("ME:",data)
    }
    const prevQuestion = async () => {
        try {
            setisLoading(true)
            const params = {
                question_id: question.data.question_id,
                audit_id: question.audit_id,
                audit_type: question.audit_type,
                employee_id: userData.emp_id,
                branch_manager: question.branch_manager
            }
            const response = await apiCall('POST', apiEndPoints.PREV_QUESTION, params)
            console.log("PREv;", response.data)
            console.log("PREv; ans", response.data.answer)
            setisLoading(false)
            if (response.status === 200) {
                if (response.data.data.check_data)
                    setquestionList(response.data.data[0].check_data.split(','))
                const imgs=response.data.answer.image_capture.split(',')
                const finalData=[]
                for(var i=0;i<imgs.length;i++)
                {
                    finalData.push({
                        path: response.data.base_url+imgs[i],
                        type: 'camera',
                        image_name: imgs[i]
                    })
                }
                setCamImg([...finalData])
                // console.log('prev data:',{ data: response.data.data[0], audit_id: params.audit_id, audit_type: params.audit_type, branch_manager: params.branch_manager })
                setquestion({ data: response.data.data[0], audit_id: params.audit_id, audit_type: params.audit_type, branch_manager: params.branch_manager })
                setremark(response.data.answer.remark)
                setrmmactionable(response.data.answer.rmm_actionable_assignee)
                setbmActionable(response.data.answer.bm_actionable_assignee)
                // setCamImg()
                setyesNo(response.data.answer.yes_no)
                setquality(response.data.answer.quality)
                setReviewValue(Number(response.data.answer.score_range))
                setcheckedAns(response.data.answer.check_answer)

            }
            else {
                alert(response.data.message)
            }
            
        } catch (error) {
            console.log("Error", error)
        }
    }
    function deleteImage(index) {
        // console.log("IMG delete",props.camImg[index].image_name)
        handleDeleteIMG(camImg[index].image_name)
        var imageArray = [...camImg]
        imageArray.splice(index, 1);
        setCamImg(imageArray)

    }
    const handleDeleteIMG = (name) => {
        const params = {
            image_name: name,
            question_id: question.data.question_id,
            audit_id: question.audit_id,
        }
        socket.emit("deleteCaptureImg", params,(data)=>{
            console.log("socket delete",data)
        })
    }
    const confirmDelete=(index)=>{
        Alert.alert(
            "Delete Image",
            "Confirm to delete image.",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => deleteImage(index) }
            ]
          );
    }
    // console.log("CAMIMG: ", camImg)
    // console.log("QUES", question)
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
                onCapture={onCapture}
                getIMG={getIMG}
                handleManagerJoin={handleManagerJoin}
                token={route.params ? route.params.token : ""}
                channelId={route.params ? route.params.channelId : ""}
                handleJoin={handleJoin}
                prevQuestion={prevQuestion}
                handleDeleteIMG={handleDeleteIMG}
                deleteImage={deleteImage}
                confirmDelete={confirmDelete}
            />

        </>
    )
}
export default Question;
