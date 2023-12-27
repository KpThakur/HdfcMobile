import React, {useEffect} from 'react';
import {View, PermissionsAndroid} from 'react-native';
import Navigation from './app/navigation';
import {EditAuditProvider} from './app/utils/EditAuditContext';
import {QuestionProvider} from './app/utils/QuestionContext';
import {UserProvider} from './app/utils/UserContext';
import NoNetworkBar from './app/component/NoNetworkBar';
import {Camera} from 'react-native-vision-camera';

function App() {
  useEffect(() => {
    requestCameraPermission();
    permission();
  }, []);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const permission = async () => {
    const newCameraPermission = Camera.getCameraPermissionStatus();
    const newMicrophonePermission = Camera.getMicrophonePermissionStatus();
    const CameraPermission = await Camera.requestCameraPermission();
    const MicrophonePermission = await Camera.requestMicrophonePermission();
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
    </View>
  );
}
export default App;
