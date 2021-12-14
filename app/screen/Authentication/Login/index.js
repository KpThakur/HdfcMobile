import AsyncStorage from '@react-native-community/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import apiEndPoints from '../../../utils/apiEndPoints';
import { apiCall } from '../../../utils/httpClient';
import LoginScreen from './component/login';
import { AuthContext,UserContext } from '../../../utils/UserContext';
import { Alert } from 'react-native';
import Loader from '../../../utils/Loader';
const Login = ({navigation}) => {
    const [userData, setUserData]=useContext(UserContext)
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [isLoading, setisLoading] = useState(false)
    const [isChecked, setisChecked] = useState(false)
    const { signIn } = React.useContext(AuthContext);
    const validationFrom = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email == "") {
            ShowAlert("Please enter email");
            return false;
        }
        if (password == '') {
            ShowAlert("Please enter password");
            return false;
        }
        return true;
    };
    const handleLogin = async () => {
        const vaild = validationFrom()
        if (vaild) {
            try {
                setisLoading(true)
                const params = {
                    email: email,
                    password: password
                }
                const response = await apiCall('POST', apiEndPoints.USERLOGIN, params)
                if (response.status === 200) {
                    signIn(response.data.token)
                    setUserData(response.data.data)
                    AsyncStorage.setItem('userData',JSON.stringify(response.data.data))
                    setisLoading(false)
                }
                else {
                    setisLoading(false)
                    ShowAlert(response.data.message)
                }

            } catch (error) {
                setisLoading(false)
                ShowAlert("Something Went Worng!")

            }
        }
    }
    const ShowAlert = (message) => {
        Alert.alert(
            'Invalid Email/Password',
            message,
        )
    }
    const handleForgetPassword=()=>{
        navigation.navigate("ForgetPassword")
    }
    return (
        <>
        {isLoading&& <Loader/>}
            <LoginScreen
                handleLogin={handleLogin}
                email={email}
                password={password}
                isLoading={isLoading}
                isChecked={isChecked} setisChecked={setisChecked}
                setpassword={setpassword} setemail={setemail} ShowAlert={ShowAlert}
                handleForgetPassword={handleForgetPassword}
            />
        </>)
}
export default Login;