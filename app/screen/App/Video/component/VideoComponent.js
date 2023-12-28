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

const VideoComponent = ({navigation, route}) => {
  const {params} = route;
  const [indicator, setIndicator] = useState(true);
  const [videoData, setVideoData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [cameraType, setCameraType] = useState(true);
  const [flashMode, setFlashMode] = useState(false);
  const currentTime = new Date();

  const camera = useRef(null);

  const handleFlash = () => {
    flashMode ? setFlashMode(true) : setFlashMode(false);
  };
  const toggleCamera = () => {
    cameraType ? setCameraType(false) : setCameraType(true);
  };
  const handleRecording = async () => {
    setIndicator(false);
    try {
      if (camera.current) {
         setTimeout(async () => {
          await stopRecording();
        }, 5000); 

        const options = {
          quality: RNCamera.Constants.VideoQuality['720p'],
          orientation: 'portrait',
          fixOrientation: true,
          forceUpOrientation: true,
        };
        const data = await camera.current.recordAsync(options);
        console.log('video recoding ---->>>', data);
        setIsLoading(true);

        //Compressing the video
        // const compressedVideo = await VideoProcessing.compress(data?.uri, {
        //   quality : 'low',
        //   bitrateMultiplier: '0.8'
        // });
        // console.log("The compressed Video ===>>",compressedVideo);
        const formdata = new FormData();

        // formdata.append('audit_id', question?.audit_id);
        formdata.append('audit_id', params?.auditId);
        formdata.append('audit_video', {
          // uri: compressedVideo,
          uri: data?.uri,
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
          navigation.navigate('DashboardScreen');
          // setstartAudit(3);
        } else {
          setIsLoading(false);
          Alert("Something went wrong, please try again !!");
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
    try {
      if (camera.current) {
        camera.current.stopRecording();
        //const videoPath = videoData[videoData.length - 1].path;
        //console.log("The videoPath ==>>", videoPath);
        /*  const formdata = new FormData();  
        formdata.append('audit_id', question?.audit_id);
        formdata.append('audit_video', videoPath);
        console.log("The form data ===>", formdata); */

        /* const header = {
          {
            "Content-Type": "multipart/form-data",
            "cache-control": "no-cache",
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data",
          }
        };  */

        /* const response = await apiCall("POST", apiEndPoints.UPLOAD_VIDEO, formdata,header);
        console.log("The response of Video Record ====>>> ", response) */
        // if(response.status ===200)
        // {
        //   // setIsLoading(false);
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading  && <Loader />}
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
            flashMode
              ? RNCamera.Constants.Type.on
              : RNCamera.Constants.Type.off
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
});
export default VideoComponent;
