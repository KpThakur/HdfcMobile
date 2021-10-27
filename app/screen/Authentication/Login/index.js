import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import apiEndPoints from '../../../utils/apiEndPoints';
import { apiCall } from '../../../utils/httpClient';
import LoginScreen from './component/login';
import { AuthContext,UserContext } from '../../../utils/UserContext';
import { Alert } from 'react-native';
import Loader from '../../../utils/Loader';
const Login = ({ navigation }) => {
    const [userData, setUserData]=useContext(UserContext)
    const [email, setemail] = useState('john@mailinator.com')
    const [password, setpassword] = useState('123456')
    const [isLoading, setisLoading] = useState(false)
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
                    console.log("response.data",response.data)
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
    return (
        <>
        {isLoading&& <Loader/>}
            <LoginScreen
                handleLogin={handleLogin}
                email={email}
                password={password}
                isLoading={isLoading}
                setpassword={setpassword} setemail={setemail} ShowAlert={ShowAlert}
            />
        </>)
}
export default Login;