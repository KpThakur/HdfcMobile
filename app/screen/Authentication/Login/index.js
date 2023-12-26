import AsyncStorage from '@react-native-community/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import apiEndPoints from '../../../utils/apiEndPoints';
import {apiCall} from '../../../utils/httpClient';
import LoginScreen from './component/login';
import {AuthContext, UserContext} from '../../../utils/UserContext';
import {Alert, TouchableOpacity} from 'react-native';
import Loader from '../../../utils/Loader';
import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {STATUS_BAR_COLOR} from '../../../utils/constant';
import {styles} from './component/styles';
import {View, Text, Button} from 'react-native';
const Login = ({navigation}) => {
  const [userData, setUserData] = useContext(UserContext);
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [isChecked, setisChecked] = useState(false);
  const [location, setLocation] = useState({latitude: null, longitude: null});

  const {signIn} = React.useContext(AuthContext);

  const validationFrom = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == '') {
      ShowAlert('Please enter email');
      return false;
    }
    if (password == '') {
      ShowAlert('Please enter password');
      return false;
    }
    return true;
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        // console.log('setLocation: ', location);
      },
      error => {
        console.log('Error getting location: ', error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

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
    getCurrentLocation();
    // CheckToken();
    requestPermission();
  }, []);

  const CheckToken = async () => {
    const deviceToken = await messaging().getToken();
    console.log('deviceToken: ', deviceToken);
    const deviceType = Platform.OS;
    console.log('deviceType: ', deviceType);
  };

  function showFlashMessage() {
    showMessage({
      message:
        'The user is logged in from another device. For a device reset, please reach out to ',
      position: 'bottom',
      type: 'danger',
      style: styles.flashMessage,
      titleStyle: styles.textStyle,
      icon: 'auto',
      renderAfterContent: () => (
        <View>
          <TouchableOpacity style={styles.touch}>
            <Text style={styles.touchText}>Click here</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }

  const handleLogin = async () => {
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
          latitude: location.latitude,
          longitude: location.longitude,
        };
        const response = await apiCall('POST', apiEndPoints.USERLOGIN, params);
        if (response.status === 200) {
          signIn(response.data.token);
          setUserData(response.data.data);
          AsyncStorage.setItem('userData', JSON.stringify(response.data.data));
          setisLoading(false);
          console.log('response: ', response.data);
        } else {
          setisLoading(false);
          ShowAlert(response.data.message);
        }
        if (response.status === 202) {
          showFlashMessage();
          setisLoading(false);
          console.log('Flashmessage: ', response.data);
        }
      } catch (error) {
        setisLoading(false);
        ShowAlert('Something Went Worng!');
      }
    }
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
