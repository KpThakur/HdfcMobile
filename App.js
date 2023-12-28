import React, {useEffect} from 'react';
import {View, PermissionsAndroid, Platform, Alert} from 'react-native';
import Navigation from './app/navigation';
import {EditAuditProvider} from './app/utils/EditAuditContext';
import {QuestionProvider} from './app/utils/QuestionContext';
import {UserProvider} from './app/utils/UserContext';
import NoNetworkBar from './app/component/NoNetworkBar';
import {Camera} from 'react-native-vision-camera';
import {PERMISSIONS, request, RESULTS, check} from 'react-native-permissions';
import FlashMessage from 'react-native-flash-message';

function App() {
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        await requestLocationPermission();
        await checkLocation();
        await requestCameraPermission();
        await permission();
      } catch (error) {
        console.log('Error:', error);
      }
    };

    requestPermissions();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const cameraPermissionStatus = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA,
        {
          message:
            'App needs access to your camera ' + 'so you can take pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (cameraPermissionStatus === RESULTS.GRANTED) {
        console.log('Camera Permission Granted ');
      } else {
        console.log('Camera Permission Denied ');
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const locationPermissionRequest = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (locationPermissionRequest === RESULTS.GRANTED) {
        console.log('Location Permission Granted');
      } else {
        console.log('Location Permission Denied ');
      }
    } catch (error) {
      console.log('location error', error);
    }
  };

  const checkLocation = async () => {
    try {
      const locationPermissionCheck = await check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (locationPermissionCheck === RESULTS.GRANTED) {
        console.log('Location checke');
      } else {
        console.log('Location not checked');
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
    }
  };

  const permission = async () => {
    const newCameraPermission = Camera.getCameraPermissionStatus();
    const CameraPermission = await Camera.requestCameraPermission();
    console.log('Camera --> ', CameraPermission);
    console.log('Microphone ---->', MicrophonePermission);
    console.log('Camera permission --> ', newCameraPermission);
    console.log('Microphone permission ---->', newMicrophonePermission);
  };
  return (
    <View style={{flex: 1}}>
      <UserProvider>
        <QuestionProvider>
          <EditAuditProvider>
            <NoNetworkBar />
            <Navigation />
          </EditAuditProvider>
        </QuestionProvider>
      </UserProvider>
      <FlashMessage />
    </View>
  );
}
export default App;
