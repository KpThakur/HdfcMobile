import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Button from '../../../../component/Button'
import Header from '../../../../component/Header'
import Input from '../../../../component/Input'
import Styles from './styles'
export default function ForgetPassword(props) {
    return (
        <View style={Styles.container}>
            <Header leftImg={''} headerText={"Forget Password"} onPress={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={Styles.scrollViewStyle}>
                <View style={{ elevation: 0.8, flex: 1, marginBottom: 25, paddingBottom: 20, borderBottomLeftRadius: 6, borderBottomRightRadius: 6, padding: 10 }}>
                    <View style={{ flex: 4 }}>
                        <Input
                            onChangeText={text=>props.setemail(text)}
                            value={props.email}
                            containerStyle={Styles.display}
                            placeholder={"Email"}
                        />
                        <Input
                            onChangeText={text=>props.setotp(text)}
                            value={props.otp}
                            containerStyle={Styles.display}
                            placeholder={"OTP"}
                        />
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, justifyContent: 'flex-end', paddingHorizontal: 20 }}>
                        <Button
                            onPress={()=>props.handleForgetPassword()}
                            buttonText={"Change Password"}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
