import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {BackHandler} from 'react-native';
import AuditScore from './AuditScore';
import {
  FONT_FAMILY_REGULAR,
  MEDIUM_FONT_SIZE,
  STOP_VIDEO,
  WHITE_BG_COLOR,
} from '../../../../utils/constant';
import Button from '../../../../component/Button';
import {QuestionContext} from '../../../../utils/QuestionContext';
import {LoadingContext} from '../../../../utils/LoadingContext';
import {apiCall} from '../../../../utils/httpClient';
import apiEndPoints from '../../../../utils/apiEndPoints';
import { useNavigation } from '@react-navigation/native';

const RecordVideo = () => {
  const [indicator, setIndicator] = useState(true);
  const [timer, setTimer] = useState(0);
  const [auditScreen, setAuditScreen] = useState(false);
  const [question, setquestion] = useContext(QuestionContext);
  const [isloading, setisLoading] = useContext(LoadingContext);
  const [totalScore, settotalScore] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    fetchScore();
  }, []);
  useEffect(() => {
    let interval;
    if (!indicator) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [indicator]);
  
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
  const onBackPress = () => {
    navigation.navigate('Profile');
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formatedTime = `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
    return formatedTime;
  };
  const startVideo = () => {
    setIndicator(false);
  };
  const stopVideo = () => {
    setTimer(0);
    setIndicator(true);
    setAuditScreen(true);
  };
  const handleViewActionable = async () => {
    setisLoading(true);
    const params = {
      audit_id: question.audit_id,
      type: 2,
    };

    const response = await apiCall(
      'POST',
      apiEndPoints.GET_ACTIONABLE_DETAIL,
      params,
    );
    setisLoading(false);
    // props.setstartAudit(4)
    // navigation.navigate("ReviewAduit",{audit_id: question.audit_id,branch_manager:question.branch_manager})
    navigation.navigate('DashboardScreen');
  };
  
  const fetchScore = async () => {
    setisLoading(true);
    const params = {
      audit_id: question.audit_id,
    };
    const response = await apiCall('POST', apiEndPoints.AUDIT_SCORE, params);
    settotalScore(response.data);
    setisLoading(false);
  };
  const startvideo = () => {
    navigation.navigate('VideoScreen', {auditId: question?.audit_id});
  };
  return (
    <>
      {auditScreen ? (
        <AuditScore
          handleViewActionable={handleViewActionable}
          type={question?.audit_type}
          totalScore={totalScore}
          startvideo={startvideo}
        />
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red'
            backgroundColor: WHITE_BG_COLOR
          }}>
          {!indicator ? (
            <Text
              style={{
                fontFamily: FONT_FAMILY_REGULAR,
                fontSize: MEDIUM_FONT_SIZE,
                color: 'black',
              }}>
              {formatTime(timer)}
            </Text>
          ) : null}
          {indicator ? (
            <Button
              buttonText={'Start recording'}
              onPress={() => startVideo()}
            />
          ) : (
            <TouchableOpacity onPress={() => stopVideo()}>
              <Image source={STOP_VIDEO} style={{width: 75, height: 75}} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
};
export default RecordVideo;
