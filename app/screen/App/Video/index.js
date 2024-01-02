import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import VideoComponent from './component/VideoComponent';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import Loader from '../../../utils/Loader';
import RNFS from 'react-native-fs';
import Header from '../../../component/Header';
import { LEFT_ARROW } from '../../../utils/constant';

const VideoScreen = ({navigation}) => {
  const [indicator, setIndicator] = useState(true);
  const [videoData, setVideoData] = useState();
  const [videoPath, setVideoPath] = useState();
  const currentTime = new Date();
  const devices = useCameraDevices();
  const camera = useRef(null);
  const device = devices.back;
  if (device == null) return <Loader />;
  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
    console.log(newCameraPermission);
    console.log(newMicrophonePermission);
  };
  const handleRecording = async () => {
    setIndicator(false);
    try {
      await camera.current.startRecording({
        flash: 'on',
        videoCodec: 'h265',
        onRecordingFinished: async video => {
          setVideoPath(video?.path);
          console.log(video?.path);
          const originalPath =
            'file:///storage/emulated/0/Android/data/com.insuranceaudit.kreate/files/Pictures';
          const fileName = '_recordedVideo' + new Date().getTime() + '.mp4';
          const destinationImagePath = originalPath + '/' + fileName;

        // Moving video file to another location

          RNFS.moveFile(video?.path, destinationImagePath)
            .then(() => {
              console.log("Video saved at -->>", destinationImagePath);
              const videoWithData = {
                path : destinationImagePath,
                type : 'camera',
                time : currentTime.toString()
              }
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
  const openCamera = () => {
    return (
      <View style={styles.bodyView}>
        <SafeAreaView>
          {/* <Header
            leftImg={LEFT_ARROW}
            onPress={() => navigation.goBack()}
          /> */}
        </SafeAreaView>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isAcitve={true}
          video={true}
          audio={true}
        />
        <TouchableOpacity
          style={styles.buttonView}
          onPress={indicator ? handleRecording() : stopRecording()}>
          <Text>{indicator ? 'Start' : 'Stop'}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <VideoComponent
        checkPermssion={checkPermission}
        openCamera={openCamera}
      />
    </>
  );
};

const styles = StyleSheet.create({
  bodyView: {
    flex: 1,
  },
  buttonView: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
});
export default VideoScreen;
