import AsyncStorage from '@react-native-community/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import apiEndPoints from '../../../utils/apiEndPoints';
import { apiCall } from '../../../utils/httpClient';
import LoginScreen from './component/login';
import { AuthContext, UserContext } from '../../../utils/UserContext';
import { Alert, TouchableOpacity } from 'react-native';
import Loader from '../../../utils/Loader';
import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';
import { STATUS_BAR_COLOR, requestGeolocationPermission } from '../../../utils/constant';
import { styles } from './component/styles';
import { View, Text, Button } from 'react-native';
const Login = ({ navigation }) => {
  const [userData, setUserData] = useContext(UserContext);
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [isChecked, setisChecked] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const { signIn } = React.useContext(AuthContext);

  const validationFrom = () => {
    let reg = /^\s*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+\s*$/;
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email === '' || email === undefined || email.trim() === '') {
      ShowAlert('Please enter email');
      return false;
    } else if (reg.test(email) === false) {
      ShowAlert('please enter valid email address');
      return false;
    } else if (password === '' || password === undefined) {
      ShowAlert('Please enter password');
      return false;
    }
    return true;
  };

  /* const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        console.log("🚀 ~ file: index.js:49 ~ getCurrentLocation ~ latitude:", latitude)
        setLocation({latitude, longitude});
        console.log('setLocation: ', location);
      },
      error => {
        console.log('Error getting location: ', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }; */

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const authStatus = await messaging().requestPermission();
      console.log('Android Permission status:', authStatus);
    } else if (Platform.OS === 'ios') {
      const settings = await messaging().requestPermission();
      console.log('iOS Permission status:', settings);
    }
  };

  useEffect(() => {
    requestPermission();
    //getCurrentLocation();
    // CheckToken();
  }, []);

  const CheckToken = async () => {
    const deviceToken = await messaging().getToken();
    console.log('deviceToken: ', deviceToken);
    const deviceType = Platform.OS;
    console.log('deviceType: ', deviceType);
  };

  function showFlashMessage(responce) {
    showMessage({
      message: responce.data.message,
      type: 'warning',
      duration: 10000,
      renderAfterContent: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.touch}
            onPress={data => sendClientRequest(responce.data.data)}>
            <Text style={styles.touchText}>Send Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress={() => hideMessage()}>
            <Text style={styles.touchText}>Close</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }

  const sendClientRequest = async data => {
    try {
      setisLoading(true);
      const params = {
        email: data?.email,
        employee_name: data?.name,
      };
      console.log(params);
      const response = await apiCall('POST', apiEndPoints.RESET_DEVICE, params);
      console.log('response: ', response);
      if (response.status === 200) {
        setisLoading(false);
        /* showMessage({
          message: response.data.message,
          type: 'success',
          duration: 3000,
        }); */
        console.log('response: ', response.data);
      } else {
        setisLoading(false);
        showMessage({
          message: response.data.message,
          type: 'danger',
          duration: 3000,
        });
      }
    } catch (error) {
      setisLoading(false);
      showMessage({
        message: error.message,
        type: 'danger',
        duration: 3000,
      });
    }
  };

  const handleLogin = async () => {
    setisLoading(true); 
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        const vaild = validationFrom();
        if (vaild) {
          
          try {
            const deviceToken = await messaging().getToken();
            const deviceType = Platform.OS;
            setisLoading(true);
            const params = {
              email: email,
              password: password,
              device_token: deviceToken,
              device_type: deviceType,
              latitude: location.latitude ? location.latitude : latitude,
              longitude: location.longitude ? location.longitude : longitude,
            };
            console.log("🚀 ~ file: index.js:153 ~ handleLogin ~ params:", params)
            const response = await apiCall('POST', apiEndPoints.USERLOGIN, params);
            if (response.status === 200) {
              signIn(response.data.token);
              setUserData(response.data.data);
              AsyncStorage.setItem('userData', JSON.stringify(response.data.data));
              setisLoading(false);
              showMessage({
                message: response.data.message,
                type: 'success',
                duration: 3000,
              });
              console.log('response: ', response.data);
            } else if (response.status === 202) {
              showFlashMessage(response);
              setisLoading(false);
              console.log('status 202: ', response.data);
            } else {
              setisLoading(false);
              showMessage({
                message: response.data.message,
                type: 'danger',
                duration: 3000,
              });
            }
          } catch (error) {
            setisLoading(false);
            showMessage({
              message: error.message,
              type: 'danger',
              duration: 3000,
            });
          }
        }else{  
          setisLoading(false); 
        }
     
      }, error => {
      console.log('error: ', error);
        setisLoading(false);
        requestGeolocationPermission()
        // showMessage({
        //   message: 'Set location permission for using App.',
        //   type: 'danger',
        //   duration: 3000,
        // });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };
  const ShowAlert = message => {
    Alert.alert('Invalid Email/Password', message);
  };
  const handleForgetPassword = () => {
    navigation.navigate('ForgetPassword');
  };
  return (
    <>
      {isLoading && <Loader />}
      <LoginScreen
        handleLogin={handleLogin}
        email={email}
        password={password}
        isLoading={isLoading}
        isChecked={isChecked}
        setisChecked={setisChecked}
        setpassword={setpassword}
        setemail={setemail}
        ShowAlert={ShowAlert}
        handleForgetPassword={handleForgetPassword}
      />
    </>
  );
};
export default Login;
