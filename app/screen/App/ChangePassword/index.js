import React, { useState } from 'react';
import { View } from 'react-native';
import ChangePasswordView from './component/ChangePassword';
import Loader from '../../../utils/Loader';
import apiEndPoints from '../../../utils/apiEndPoints';
import { apiCall } from '../../../utils/httpClient';
import { showMessage } from 'react-native-flash-message';
function ChangePassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [passwordData, setPasswordData] = React.useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    function validation(params) {
        if (passwordData.oldPassword === "") {
            alert("Enter Old Password");
            return false
        }
        if (passwordData.newPassword === "") {
            alert("Enter New Password");
            return false
        }
        if (passwordData?.newPassword?.length <= 5) {
            alert("Enter min 6 characters");
            return false;
        }
        if (passwordData.confirmPassword == '') {
            alert("Enter Confirm Password");
            return false;
        }
        if (passwordData.confirmPassword !== passwordData.newPassword) {
            alert("Confirm password and New password doesn't match ");
            return false;
        }
        return true
    };
    async function _handleUpdate(params) {
        const valid = validation()
        if (valid) {
            setIsLoading(true)
            try {
                const params = {
                    'new_password': passwordData.newPassword,
                    'old_password': passwordData.oldPassword,
                }
                const res = await apiCall("POST", apiEndPoints.CHANGE_PASSWORD, params);
                
                if (res?.data?.status === 200) {
                    setIsLoading(false)
                    setPasswordData({
                        ...passwordData,
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    });
                    showMessage({
                        message: res.data.message,
                        type:'success',
                        duration: 3000
                    })
                } else if (res?.data?.status === 401) {
                    alert(res.data.message)
                    setIsLoading(false)
                    showMessage({
                        message: res.data.message,
                        type:'danger',
                        duration: 3000
                    })
                } else {
                    alert(res.data.message)
                    setIsLoading(false)
                }
            } catch (eu) {
                alert(JSON.stringify(eu))
                setIsLoading(false)
                showMessage({
                    message: res.data.message,
                    type:'danger',
                    duration: 3000
                })
            }
        }
    };
    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <ChangePasswordView
                passwordData={passwordData}
                setPasswordData={setPasswordData}
                _handleUpdate={_handleUpdate}
            />
        </View>
    );
};
export default ChangePassword;
