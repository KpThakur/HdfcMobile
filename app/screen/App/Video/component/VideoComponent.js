import React, {useContext, useEffect, useRef, useState} from 'react';
import RNFS from 'react-native-fs';
import {RNCamera} from 'react-native-camera';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import {
  BLACK_COLOR,
  FLASH_OFF,
  FLASH_ON,
  FLIP_ICON,
  FONT_FAMILY_REGULAR,
  GREY_TEXT_COLOR,
  LARGE_FONT_SIZE,
  LEFT_ARROW,
  MAIN_BG_GREY_COLOR,
  MEDIUM_FONT_SIZE,
  PRIMARY_BTN_COLOR,
  SMALL_FONT_SIZE,
  STOP_VIDEO,
  VIDEO,
  WHITE_BG_COLOR,
} from '../../../../utils/constant';
import Header from '../../../../component/Header';
import Loader from '../../../../utils/Loader';
import {QuestionContext} from '../../../../utils/QuestionContext';
import {apiCall} from '../../../../utils/httpClient';
import apiEndPoints from '../../../../utils/apiEndPoints';
// import VideoProcessing from 'react-native-video-processing';
import {Video} from 'react-native-compressor';

const VideoComponent = ({navigation, route}) => {
  const {params} = route;
  const [indicator, setIndicator] = useState(true);
  const [videoData, setVideoData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [cameraType, setCameraType] = useState(true);
  const [flashMode, setFlashMode] = useState(false);
  const [timer, setTimer] = useState(0);
  let manualStop = false;
  const currentTime = new Date();
  const camera = useRef(null);

  useEffect(() => {
    let interval;
    if (!indicator) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [indicator]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formatedTime = `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
    return formatedTime;
  };

  const handleFlash = () => {
    flashMode ? setFlashMode(true) : setFlashMode(false);
  };
  const toggleCamera = () => {
    cameraType ? setCameraType(false) : setCameraType(true);
  };
  const handleRecording = async () => {
    setIndicator(false);
    manualStop = false;
    try {
      if (camera.current) {
        setTimeout(async () => {
          if (!manualStop) {
            await stopRecording();
          }
        }, 30000);

        const options = {
          quality: RNCamera.Constants.VideoQuality['720p'],
          orientation: 'portrait',
          fixOrientation: true,
          forceUpOrientation: true,
        };
        const data = await camera.current.recordAsync(options);
        console.log('video recoding ---->>>', data);
        setIsLoading(true);

        // Compressing the video
        const compressedVideo = await Video.compress(
          data?.uri,
          {},
          progress => {
            console.log('Compression Progress: ', progress);
          },
        );

        console.log('The compressed Video ===>>', compressedVideo);
        const formdata = new FormData();

        formdata.append('audit_id', params?.auditId);
        formdata.append('audit_video', {
          uri: compressedVideo,
          type: 'video/mp4',
          name: 'demo.mp4',
        });

        console.log('ttttt=======', formdata);

        const response = await apiCall(
          'POST',
          apiEndPoints.UPLOAD_VIDEO,
          formdata,
          {
            'Content-Type': 'multipart/form-data',
            'cache-control': 'no-cache',
            processData: false,
            contentType: false,
            mimeType: 'multipart/form-data',
          },
        );
        console.log('The response of Video Record ====>>> ', response.data);
        if (response.status === 200) {
          setIsLoading(false);
          Alert.alert('Audit completed !');
          navigation.navigate("ScheduleNewAuditScreen");
          // navigation.navigate('DashboardScreen');
          
          // setstartAudit(3);
        } else {
          setIsLoading(false);
          setTimer(0);
          Alert.alert('Something went wrong, please try again !!');
        }
      } else {
        console.error('Camera ref is null');
      }
    } catch (error) {
      console.error('Error in recording video', error);
    }
  };
  const stopRecording = async () => {
    // setIsLoading(true);
    setIndicator(true);
    manualStop = true;
    try {
      if (camera.current) {
        camera.current.stopRecording();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <SafeAreaView>
        <Header
          leftImg={LEFT_ARROW}
          headerText={'Video'}
          onPress={() => navigation.goBack()}
        />
      </SafeAreaView>
      <View style={styles.bodyView}>
        <RNCamera
          style={StyleSheet.absoluteFill}
          type={
            cameraType
              ? RNCamera.Constants.Type.back
              : RNCamera.Constants.Type.front
          }
          flash={
            flashMode ? RNCamera.Constants.Type.on : RNCamera.Constants.Type.off
          }
          captureAudio={true}
          ref={camera}></RNCamera>

        <View
          style={{
            marginBottom: 20,
            // position: 'absolute',
            // right: 50,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: GREY_TEXT_COLOR,
            marginBottom: 0,
          }}>
          <TouchableOpacity style={{width: 50}}>
            <Text style={styles.timerTextStyle}>{formatTime(timer)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // style={styles.buttonView}
            onPress={
              indicator ? () => handleRecording() : () => stopRecording()
            }>
            {indicator ? (
              <Image source={VIDEO} style={{width: 75, height: 75}} />
            ) : (
              <Image source={STOP_VIDEO} style={{width: 75, height: 75}} />
            )}

            {/* <Image source={VIDEO} style={{width: 70, height: 70}} /> */}
            {/* <Text style={styles.buttonText}>
              {indicator ? 'Start' : 'Stop'}
            </Text> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleCamera()}>
            <Image source={FLIP_ICON} style={styles.iconView} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bodyView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  innerView: {
    marginHorizontal: 10,
    padding: 90,
    backgroundColor: WHITE_BG_COLOR,
    borderRadius: 10,
  },
  buttonView: {
    borderRadius: 50,
    height: 70,
    width: 70,
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'red',
    // backgroundColor: PRIMARY_BTN_COLOR,
  },
  buttonText: {
    color: WHITE_BG_COLOR,
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: SMALL_FONT_SIZE,
  },
  textStyle: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: MEDIUM_FONT_SIZE,
    color: BLACK_COLOR,
  },
  iconView: {
    width: 50,
    height: 50,
    color: 'white',
  },
  timerTextStyle: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: MEDIUM_FONT_SIZE,
    color: BLACK_COLOR,
  },
});
export default VideoComponent;
