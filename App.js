import React, {useEffect} from 'react';
import {View, PermissionsAndroid} from 'react-native';
import Navigation from './app/navigation';
import {EditAuditProvider} from './app/utils/EditAuditContext';
import {QuestionProvider} from './app/utils/QuestionContext';
import {UserProvider} from './app/utils/UserContext';
import NoNetworkBar from './app/component/NoNetworkBar';
import { Camera } from 'react-native-vision-camera';
import {PERMISSIONS, request, RESULTS, check} from 'react-native-permissions';

function App() {

  useEffect(() => {
    requestCameraPermission();
    checkLocation();
    permission();
  }, []);
  

  const requestCameraPermission = async () => {
    try {
      const cameraPermissionStatus = await request(PERMISSIONS.IOS.CAMERA, {
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (cameraPermissionStatus === RESULTS.GRANTED) {
        console.log('Camera Permission Granted on iOS');
      } else {
        console.log('Camera Permission Denied on iOS');
      }
      const cameraPermissionAndroid = await request(
        PERMISSIONS.ANDROID.CAMERA,
        {
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (cameraPermissionAndroid === RESULTS.GRANTED) {
        console.log('Camera Permission Granted on Android');
      } else {
        console.log('Camera Permission Denied on Android');
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };



  const checkLocation = async () => {
    try {
     
      const locationPermissioniOs = await check(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );

      if (locationPermissioniOs === RESULTS.DENIED) {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === RESULTS.GRANTED) {
          console.log('Location Permission Granted on iOS');
        } else {
          console.log('Location Permission Denied on iOS');
        }
      } else if (locationPermissioniOs === RESULTS.GRANTED) {
        console.log('Location Permission Already Granted on iOS');
      }

      const locationPermissionAndroid = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (locationPermissionAndroid === RESULTS.DENIED) {
        const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (result === RESULTS.GRANTED) {
          console.log('Location Permission Granted on Android');
        } else {
          console.log('Location Permission Denied on Android');
        }
      } else if (locationPermissionAndroid === RESULTS.GRANTED) {
        console.log('Location Permission Already Granted on Android');
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
    }
  };
  
  const permission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
    console.log(newCameraPermission);
    console.log(newMicrophonePermission);
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
    </View>
  );
}
export default App;
