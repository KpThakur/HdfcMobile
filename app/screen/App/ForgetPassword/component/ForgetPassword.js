import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import Button from '../../../../component/Button';
import Header from '../../../../component/Header';
import Input from '../../../../component/Input';
import Styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { LEFT_ARROW } from '../../../../utils/constant';
export default function ForgetPassword(props) {
  const navigation = useNavigation();
  return (
    <View style={Styles.container}>
      <Header
        leftImg={LEFT_ARROW}
        headerText={'Forget Password'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={Styles.scrollViewStyle}>
        <View
          style={{
            elevation: 1,
            flex: 1,
            marginBottom: 25,
            paddingBottom: 20,
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
            padding: 10,
          }}>
          <View style={{flex: 4}}>
            <Input
              onChangeText={text => props.setemail(text)}
              value={props.email}
              containerStyle={Styles.display}
              placeholder={'Email'}
            />
            {props.verfyOTP && (
              <Input
                onChangeText={text => props.setotp(text)}
                value={props.otp}
                containerStyle={Styles.display}
                placeholder={'OTP'}
                keyboardType={'numeric'}
              />
            )}
            {props.verfyOTP && (
              <TouchableOpacity onPress={() => props.resendotp()} style={Styles.touch}>
                <Text style={Styles.touchText}>Resend Otp</Text>
              </TouchableOpacity>
            )}
            {props.changePassowrd && (
              <Input
                onChangeText={text => props.setpassword(text)}
                value={props.password}
                containerStyle={Styles.display}
                placeholder={'Password'}
                InputHeading={'Password'}
                eye={true}
              />
            )}
          </View>

          <View
            style={{
              flex: 2,
              paddingVertical: 15,
              justifyContent: 'flex-end',
              paddingHorizontal: 20,
            }}>
            <Button
              onPress={() => props.handleForgetPassword()}
              buttonText={'Change Password'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
