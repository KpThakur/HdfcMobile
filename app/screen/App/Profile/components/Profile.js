import React from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import Header from '../../../../component/Header';
import Input from '../../../../component/Input'

const Profile = () => {
    return (
        <View style={{ flex: 1, }}>
            <Header headerText={"Profile"} />
            <View style={{ flex: 5, backgroundColor: 'red' }}>
                <Input
                    placeholder={"Search"}
                    containerStyle={{ backgroundColor: "#f0f0f0" }}
                    placeholderTextColor={{ color: "#5d5d5d" }}
                    value={""}
                />
            </View>
        </View>
    )
}
export default Profile;