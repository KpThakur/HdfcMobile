import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
import apiEndPoints from '../../../utils/apiEndPoints';
import { apiCall } from '../../../utils/httpClient';
import LoginScreen from './component/login';
import {AuthContext} from '../../../utils/UserContext';
import { Alert } from 'react-native';


const Login = ({navigation})=>{
    const [email, setemail] = useState('john@mailinator.com')
    const [password, setpassword] = useState('123456')
    const [IsLoading, setIsLoading] = useState(false)
    const { signIn } = React.useContext(AuthContext);
    const validationFrom=()=> {
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
    const handleLogin=async()=>{
        const vaild=validationFrom()
        if(vaild){
        try {
            setIsLoading(true)
            const params={
                email:email,
                password:password
            }
            const response=await apiCall('POST',apiEndPoints.USERLOGIN,params)
            console.log("resposne",response)
            if(response.status===200)
            {
                signIn(response.data.token)
                setIsLoading(false)
            }
            else{
                setIsLoading(false)
                ShowAlert(response.data.message)
            }

        } catch (error) {
            setIsLoading(false)
            ShowAlert("Something Went Worng!")
            
        }}
    }
    const ShowAlert=(message)=>{
        Alert.alert(
            'Invalid Email/Password',
            message,
        )
    }
    return(<LoginScreen 
        handleLogin={handleLogin}
        email={email}
        password={password} 
        IsLoading={IsLoading}
        setpassword={setpassword} setemail={setemail} ShowAlert={ShowAlert}
    />)
}
export default Login;