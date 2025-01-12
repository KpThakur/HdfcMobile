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
import {normalize} from './app/utils/scaleFontSize';
import {
  FONT_FAMILY_SEMI_BOLD,
  WHITE_BG_COLOR,
  requestGeolocationPermission,
} from './app/utils/constant';
import Geolocation from 'react-native-geolocation-service';
import {LoadingProvider} from './app/utils/LoadingContext';
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
        /*  {
          message:
            'App needs access to your camera ' + 'so you can take pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }, */
      );

      if (cameraPermissionStatus === RESULTS.GRANTED) {
        console.log('Camera Permission Granted ');
      }
      if (Platform.OS === 'android' && parseInt(Platform.Version, 10) >= 13) {
        const response = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (response === RESULTS.GRANTED) {
          console.log('Camera Permission Granted >= 13');
        }
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
          ? requestGeolocationPermission()
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (Platform.OS === 'android') {
        const response = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (response === RESULTS.GRANTED) {
          console.log('Location Permission Granted >= 13');
        }
      }
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
      Geolocation.getCurrentPosition(
        async position => {
          const {latitude, longitude} = position.coords;

          const locationPermissionCheck = await check(
            Platform.OS === 'ios'
              ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
              : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );

          if (Platform.OS === 'android') {
            const response = await PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (response === RESULTS.GRANTED) {
              console.log('Location checke >= 13');
            }
          }

          if (locationPermissionCheck === RESULTS.GRANTED) {
            console.log('Location checke');
          } else {
            console.log('Location not checked');
          }
        },
        error => {
          console.log('Error getting location: ', error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (error) {
      console.error('Error checking location permission:', error);
    }
  };

  const permission = async () => {
    const newCameraPermission = Camera.getCameraPermissionStatus();
    const CameraPermission = await Camera.requestCameraPermission();
    console.log('Camera --> ', CameraPermission);
    console.log('Camera permission --> ', newCameraPermission);
  };
  return (
    <View style={{flex: 1}}>
      <LoadingProvider>
        <UserProvider>
          <QuestionProvider>
            <EditAuditProvider>
              <NoNetworkBar />
              <Navigation />
            </EditAuditProvider>
          </QuestionProvider>
        </UserProvider>
      </LoadingProvider>
      <FlashMessage
        position={'bottom'}
        style={{
          borderRadius: normalize(12),
          marginHorizontal: normalize(30),
          marginBottom: normalize(3),
        }}
        titleStyle={{
          fontFamily: FONT_FAMILY_SEMI_BOLD,
          fontSize: normalize(14),
          color: WHITE_BG_COLOR,
        }}
      />
    </View>
  );
}
export default App;
