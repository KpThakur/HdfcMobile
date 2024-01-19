import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import apiEndPoints from '../../../utils/apiEndPoints';
import {apiCall, setDefaultHeader} from '../../../utils/httpClient';
import ForgetPassword from './component/ForgetPassword';
import Loader from '../../../utils/Loader';
import {showMessage} from 'react-native-flash-message';
import { LoadingContext } from '../../../utils/LoadingContext';

export default function Index() {
  const [email, setemail] = useState();
  const [otp, setotp] = useState();
  const [password, setpassword] = useState();
  const [verfyOTP, setverfyOTP] = useState(false);
  const [changePassowrd, setchangePassowrd] = useState(false);
  const [token, settoken] = useState();
  const [isLoading, setisLoading] = useContext(LoadingContext);
  // const [isLoading, setisLoading] = useState(false);

  const navigation = useNavigation();

  const validationFrom = () => {
    
    let reg = /^\s*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+\s*$/;
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email === '' || email === undefined || email.trim() === '') {
      ShowAlert('Please enter email');
      return false;
    } else if (reg.test(email) === false) {
      ShowAlert('please enter valid email address');
      return false;
    } else if (verfyOTP && (otp === '' || otp === undefined)) {
      ShowAlert('Please enter otp');
      return false;
    } else if (changePassowrd && (password === '' || password === undefined)) {
      ShowAlert('Please enter password');
      return false;
    }
    return true;
  };

  const ShowAlert = message => {
    Alert.alert(message);
  };

  const resendotp = async () => {
    try {
      setisLoading(true);
      const params = {
        email: email,
        otp: otp,
        password,
      };
      if (verfyOTP) {
        const response = await apiCall(
          'POST',
          apiEndPoints.FORGET_PASSWORD,
          params,
        );
        if (response.data.status === 200) {
          // Alert.alert('OTP send to your email');
          console.log('response staus 200', response.data);
          setverfyOTP(true);
          setotp('');
          setisLoading(false);
          showMessage({
            message: response.data.message,
            type: 'success',
            duration: 3000,
          });
        }
      }
    } catch (error) {
      showMessage({
        message: error.message,
        type: 'danger',
        duration: 3000,
      });
      console.log(error);
      setisLoading(false);
    }
  };

  const handleForgetPassword = async () => {
    const vaild = validationFrom();
    if (vaild) {
      try {
        setisLoading(true);
        const params = {
          email: email,
          otp: otp,
          password,
        };
        if (!verfyOTP) {
          const response = await apiCall(
            'POST',
            apiEndPoints.FORGET_PASSWORD,
            params,
          );
          if (response.data.status === 200) {
            // Alert.alert('OTP send to your email');
            console.log('response staus 200', response.data);
            setverfyOTP(true);
            setisLoading(false);
            showMessage({
              message: response.data.message,
              type: 'success',
              duration: 3000,
            });
          }
        }
        if (verfyOTP) {
          const response = await apiCall(
            'POST',
            apiEndPoints.VERIFY_OTP,
            params,
          );
          settoken(response.data.token);
          if (response.data.status === 200) {
            setchangePassowrd(true);
            setverfyOTP(false);
            setisLoading(false);
            showMessage({
              message: response.data.message,
              type: 'success',
              duration: 3000,
            });
            console.log('response staus 200', response.data);
          }
          if (response.data.status === 201) {
            // Alert.alert(response.data.message);
            setisLoading(false);
            showMessage({
              message: response.data.message,
              type: 'danger',
              duration: 3000,
            });
            console.log('response staus 201', response.data);
          }
        }
        if (changePassowrd) {
          setDefaultHeader('token', token);
          const response = await apiCall(
            'POST',
            apiEndPoints.RESET_PASSWORD,
            params,
          );
          if (response.data.status === 200) {
            // Alert.alert(response.data.message);
            setisLoading(false);
            navigation.navigate('Login');
            showMessage({
              message: response.data.message,
              type: 'success',
              duration: 3000,
            });
          }
        }
      } catch (error) {
        showMessage({
          message: error.message,
          type: 'danger',
          duration: 3000,
        });
        console.log(error);
        setisLoading(false);
      }
    }
  };
  return (
    <>
      {/* {isLoading && <Loader />} */}
      <ForgetPassword
        email={email}
        setemail={setemail}
        otp={otp}
        setotp={setotp}
        handleForgetPassword={handleForgetPassword}
        resendotp={resendotp}
        verfyOTP={verfyOTP}
        password={password}
        setpassword={setpassword}
        changePassowrd={changePassowrd}
        isLoading={isLoading}
      />
    </>
  );
}
