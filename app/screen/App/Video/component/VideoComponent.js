import React, {useEffect, useRef, useState} from 'react';
import RNFS from 'react-native-fs';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
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
  const devices = useCameraDevices('back');
  const camera = useRef(null);
  // const device = devices.back;
  // if (device == null) return <Loader/>;
  useEffect(() => {
    if (devices) {
      setSelectedDevice(devices);
    } else {
      console.log('No camera device available.');
    }
  }, [devices]);
  const handleRecording = () => {
    setIndicator(false);
    try {
      if (camera.current) {
        camera.current.startRecording({
          flash: 'on',
          videoCodec: 'h265',
          onRecordingFinished: async video => {
            setVideoPath(video?.path);
            console.log(video?.path);
            const originalPath =
              'file:///storage/emulated/0/Android/data/com.audit.Kreate/files/Pictures';
            const fileName = '_recordedVideo' + new Date().getTime() + '.mp4';
            const destinationImagePath = originalPath + '/' + fileName;

            // Moving video file to another location

            RNFS.moveFile(video?.path, destinationImagePath)
              .then(() => {
                console.log('Video saved at -->>', destinationImagePath);
                const videoWithData = {
                  path: destinationImagePath,
                  type: 'camera',
                  time: currentTime.toString(),
                };
                let camVid = videoData == null ? [] : [videoData];
                camVid.push(videoWithData);
                setVideoData(camVid);
              })
              .catch(error => {
                console.log(error);
              });
          },
          onRecordingError: error => console.error(error),
        });
      } else {
        console.error('Camera ref is null');
      }
    } catch (error) {
      console.error('Error in recording video', error);
    }
  };
  const stopRecording = async () => {
    try {
      await camera.current.stopRecording();
    } catch (error) {
      console.log(error);
    }
  };
  const renderCameraView = () => {
    return (
      <View style={styles.bodyView}>
        <SafeAreaView>
          {/* <Header
            leftImg={LEFT_ARROW}
            onPress={() => navigation.goBack()}
          /> */}
        </SafeAreaView>
        <Camera
          ref={ref => (camera.current = ref)}
          style={StyleSheet.absoluteFill}
          device={devices}
          isAcitve={true}
          video={true}
          audio={true}
        />
        <TouchableOpacity style={styles.buttonView} onPress={handleRecording}>
          <Text>{indicator ? 'Start' : 'Stop'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const openCamera = () => {
    if (selectedDevice) {
      setIsCameraOpen(true);
      console.log('The open camera is running !!');
    } else {
      console.error('Cannot open camera, no valid device selected.');
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
      <View style={styles.mainView}>
        <View style={styles.innerView}>
          <Text style={styles.textStyle}> Upload your video</Text>
          <TouchableOpacity style={styles.buttonView} onPress={openCamera}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isCameraOpen && renderCameraView()}
    </>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: PRIMARY_BTN_COLOR,
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
