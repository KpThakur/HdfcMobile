import React, {useEffect, useRef, useState} from 'react';
import RNFS from 'react-native-fs';
import {Camera, getCameraFormat} from 'react-native-vision-camera';
import 'react-native-reanimated';
// import {RNCam}
// import {RNCamera} from 'react-native-camera';
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

const VideoComponent = ({navigation}) => {
  const [indicator, setIndicator] = useState(true);
  const [videoData, setVideoData] = useState();
  const [videoPath, setVideoPath] = useState();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const currentTime = new Date();
  // const devices = useCameraDevice('back');
  const devices = Camera.getAvailableCameraDevices();
  const device = devices.find(d => d.position === 'back');
  const camera = useRef(null);
  const format = getCameraFormat(device, [{ videoResolution: { width: 3048, height: 2160 } },
    { fps: 30 }])
  // const device = devices.back;
  // if (device == null) return <Loader/>;
  // useEffect(() => {
  //   if (devices) {
  //     setSelectedDevice(devices[0]);
  //   } else {
  //     console.log('No camera device available.');
  //   }
  // }, [devices]);
  const handleRecording = async () => {
    setIndicator(false);
    console.log("camera.current.startRecording", camera.current.startRecording)
    try {
      if (camera.current) {
      //   const options = {
      //     quality: Camera.Constants.VideoQuality['720p'],
      //     orientation: 'portrait',
      //     fixOrientation: true,
      //     forceUpOrientation: true,
      //   };
      //   const data = await camera.current.recordAsync(options);
      //   console.log('video recoding', data);
      //   if (data) {
      //     const videoRecordPromise = await data;
      //     const source = videoRecordPromise.uri;
      //      console.log("URI of video :- ", source);
      //   }
         camera.current.startRecording({
          // flash: 'on',
          //  device: selectedDevice,
          fileType: "mp4",
          device: device,
          // videoCodec: 'h265',
          // videoBitRate: "extra-low",
          onRecordingFinished: (video) => {
            setIndicator(true)
            console.log("video", video)
            // setVideoPath(video?.path);
            console.log(video?.path);
            // const originalPath =
            //   'file:///storage/emulated/0/Android/data/com.audit.Kreate/files/Pictures';
            const originalPath = video?.path;
            const fileName = '_recordedVideo' + new Date().getTime() + '.mp4';
            const destinationImagePath = originalPath + '/' + fileName;

            // Moving video file to another location

            // RNFS.moveFile(video?.path, destinationImagePath)
            //   .then(() => {
            //     console.log('Video saved at -->>', destinationImagePath);
            //     const videoWithData = {
            //       path: destinationImagePath,
            //       type: 'camera',
            //       time: currentTime.toString(),
            //     };
            //     let camVid = videoData == null ? [] : [videoData];
            //     camVid.push(videoWithData);
            //     setVideoData(camVid);
            //   })
            //   .catch(error => {
            //     console.log(error);
            //   });
          },
          onRecordingError: error => console.error("onRecordingError",error),
        });
      } else {
        console.error('Camera ref is null');
      }
    } catch (error) {
      console.error('Error in recording video', error);
    }
  };
  const stopRecording = async () => {
    setIndicator(true);
    try {
      // if (camera.current) {
      //   camera.current.stopRecording();
      // }
      await camera.current.stopRecording();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SafeAreaView>
        <Header
          leftImg={LEFT_ARROW}
          headerText={'Start Video'}
          onPress={() => navigation.goBack()}
        />
      </SafeAreaView>
      <View style={styles.bodyView}>
        {/* <Camera
          ref={ref => (camera.current = ref)}
          style={StyleSheet.absoluteFill}
          type={Camera.Constants.Type.back}
          flashMode={Camera.Constants.FlashMode.off}
        >
          <TouchableOpacity
            style={styles.buttonView}
            onPress={indicator ? handleRecording : stopRecording}>
            <Text>{indicator ? 'Start' : 'Stop'}</Text>
          </TouchableOpacity>
        </Camera> */}
        <Camera
          // ref={ref => (camera.current = ref)}
          ref={camera}
          style={StyleSheet.absoluteFill}
          format={format}
          device={device}
          isActive={true}
          video={true}
          audio={true}
        /> 
           <TouchableOpacity
            style={styles.buttonView}
            onPress={indicator ? () =>handleRecording() : () =>  stopRecording()}>
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
