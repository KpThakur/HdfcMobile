import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import apiEndPoints from '../../../utils/apiEndPoints';
import {apiCall, setDefaultHeader} from '../../../utils/httpClient';
import ForgetPassword from './component/ForgetPassword';

export default function Index() {
  const [email, setemail] = useState();
  const [otp, setotp] = useState();
  const [password, setpassword] = useState();
  const [verfyOTP, setverfyOTP] = useState(false);
  const [changePassowrd, setchangePassowrd] = useState(false);
  const [token, settoken] = useState();
  const navigation = useNavigation();

  function validationFrom() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == '') {
      Alert.alert('Please enter email address');
      return false;
    }
    if (reg.test(email) == '') {
      Alert.alert('please enter valid email address');
      return false;
    }
    if (password == '') {
      Alert.alert('Please enter password');
      return false;
    }

    return true;
  }


  const handleForgetPassword = async () => {
    const vaild = validationFrom();
    if (vaild) {
      try {
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
            Alert.alert('OTP send to your email');
            console.log('response staus 200', response.data);
            setverfyOTP(true);
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
            console.log('response staus 200', response.data);
          }
          if (response.data.status === 201) {
            Alert.alert(response.data.message);
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
            Alert.alert(response.data.message);
            navigation.navigate('Login');
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <ForgetPassword
      email={email}
      setemail={setemail}
      otp={otp}
      setotp={setotp}
      handleForgetPassword={handleForgetPassword}
      verfyOTP={verfyOTP}
      password={password}
      setpassword={setpassword}
      changePassowrd={changePassowrd}
    />
  );
}
