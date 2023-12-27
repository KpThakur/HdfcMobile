import React, {useContext, useEffect, useRef, useState} from 'react';
import RNFS from 'react-native-fs';
// import {Camera, getCameraFormat} from 'react-native-vision-camera';
import {RNCamera} from 'react-native-camera';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  BLACK_COLOR,
  FONT_FAMILY_REGULAR,
  GREY_TEXT_COLOR,
  LARGE_FONT_SIZE,
  LEFT_ARROW,
  MAIN_BG_GREY_COLOR,
  MEDIUM_FONT_SIZE,
  PRIMARY_BTN_COLOR,
  SMALL_FONT_SIZE,
  WHITE_BG_COLOR,
} from '../../../../utils/constant';
import Header from '../../../../component/Header';
import Loader from '../../../../utils/Loader';
import {QuestionContext} from '../../../../utils/QuestionContext';
import {apiCall} from '../../../../utils/httpClient';
import apiEndPoints from '../../../../utils/apiEndPoints';

const VideoComponent = ({navigation}) => {
  const [indicator, setIndicator] = useState(true);
  const [videoData, setVideoData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [question, setquestion] = useContext(QuestionContext);
  const currentTime = new Date();

  const camera = useRef(null);

  const handleRecording = async () => {
    setIndicator(false);
    try {
      if (camera.current) {
        /*  setTimeout(async () => {
          await stopRecording();
        }, 30000); */

        const options = {
          quality: RNCamera.Constants.VideoQuality['720p'],
          orientation: 'portrait',
          fixOrientation: true,
          forceUpOrientation: true,
        };
        const data = await camera.current.recordAsync(options);
        console.log('video recoding ---->>>', data);
        setIsLoading(true);
        const formdata = new FormData();
         
        formdata.append('audit_id', question?.audit_id);
        formdata.append('audit_video', {
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
          navigator.navigate('DashboardScreen');
        }

        /*   const fileName = '_recordedVideo_' + new Date().getTime() + '.mp4';
        const destinationImagePath =
          RNFS.ExternalDirectoryPath + '/' + fileName;

         RNFS.moveFile(data?.uri, destinationImagePath)
          .then(async () => {
            console.log('Video saved at -->>', destinationImagePath);
            const videoWithData = {
              path: destinationImagePath,
              type: 'camera',
              time: currentTime.toString(),
            };

           
            let camVid = videoData == null ? [...videoWithData]: [...videoData] ;
            camVid.push(videoWithData);
            setVideoData(camVid);
            
            
          })
          .catch(error => {
            console.log(error);
          }); */
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
      {loading && <Loader />}
      <SafeAreaView>
        <Header
          leftImg={LEFT_ARROW}
          headerText={'Start Video'}
          onPress={() => navigation.goBack()}
        />
      </SafeAreaView>
      <View style={styles.bodyView}>
        <RNCamera
          style={StyleSheet.absoluteFill}
          type={RNCamera.Constants.Type.back}
          captureAudio={true}
          ref={camera}></RNCamera>
        <TouchableOpacity
          style={styles.buttonView}
          onPress={indicator ? () => handleRecording() : () => stopRecording()}>
          <Text>{indicator ? 'Start' : 'Stop'}</Text>
        </TouchableOpacity>
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
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GREY_TEXT_COLOR,
    //   backgroundColor: MAIN_BG_GREY_COLOR,
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
});
export default VideoComponent;

// import React, { useState, useRef } from 'react';
// import {
//   View,
//   TouchableOpacity,
//   Text,
//   StyleSheet
// } from 'react-native';
// import { Camera, FileSystem, Permissions } from 'react-native-vision-camera';
// import Video from 'react-native-video';

// const VideoComponent = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [videoPath, setVideoPath] = useState('');
//   const cameraRef = useRef();
//   const devices = Camera.getAvailableCameraDevices();
//   const device = devices.find(d => d.position === 'back');

//   const startRecording = async () => {
//     // const hasPermission = await requestCameraPermission();
//     // if (!hasPermission) return;

//     setIsRecording(true);

//     const videoPath = `${FileSystem.cacheDirectory}/video.mp4`;
//     setVideoPath(videoPath);

//     cameraRef.current.startRecording({
//       quality: '720p',
//       videoBitrate: 2000000,
//       maxDuration: 10, // Set the maximum duration in seconds (optional)
//       maxFileSize: 100 * 1024 * 1024, // Set the maximum file size in bytes (optional)
//       outputPath: videoPath,
//     });
//   };

//   const stopRecording = async () => {
//     setIsRecording(false);
//     await cameraRef.current.stopRecording();
//   };

//   const requestCameraPermission = async () => {
//     const { status } = await Permissions.requestMultiple([
//       Permissions.PERMISSIONS.ANDROID.CAMERA,
//       Permissions.PERMISSIONS.ANDROID.RECORD_AUDIO,
//       Permissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
//     ]);
//     return (
//       status[Permissions.PERMISSIONS.ANDROID.CAMERA] === 'granted' &&
//       status[Permissions.PERMISSIONS.ANDROID.RECORD_AUDIO] === 'granted' &&
//       status[Permissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === 'granted'
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} ref={cameraRef} device={device}/>

//       {isRecording ? (
//         <TouchableOpacity style={styles.recordButton} onPress={stopRecording}>
//           <Text style={styles.recordButtonText}>Stop Recording</Text>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
//           <Text style={styles.recordButtonText}>Start Recording</Text>
//         </TouchableOpacity>
//       )}

//       {videoPath !== '' && (
//         <View style={styles.videoPlayer}>
//           <Video source={{ uri: videoPath }} style={styles.videoPlayer} controls />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   camera: {
//     flex: 1,
//   },
//   recordButton: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//     backgroundColor: 'red',
//     padding: 20,
//     alignItems: 'center',
//   },
//   recordButtonText: {
//     fontSize: 18,
//     color: '#fff',
//   },
//   videoPlayer: {
//     flex: 1,
//     marginTop: 20,
//   },
// });

// export default VideoComponent;
