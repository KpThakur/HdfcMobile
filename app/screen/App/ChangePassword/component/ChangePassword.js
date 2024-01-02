import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '../../../../component/Header';
import Button from '../../../../component/Button';
import styles from './styles';
import Input from "../../../../component/Input";
import { useNavigation, DrawerActions } from '@react-navigation/native';
function ChangePassword(props) {
  const navigation = useNavigation()
  
  function _handleDrawer(params) {
    navigation.openDrawer()
  }
  return (
    <View style={styles.container}>
      <Header headerText={"Change Password"} onPress={() => _handleDrawer()} />
      {/* <Header headerText={"Change Password"} onPress={() =>{navigation.dispatch(DrawerActions.toggleDrawer())}} /> */}
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={{ elevation: 0.8, flex: 1, marginBottom: 25, paddingBottom: 20, borderBottomLeftRadius: 6, borderBottomRightRadius: 6, padding: 10 }}>
          <View style={{ flex: 4 }}>
            <Input
              onChangeText={(value) => props.setPasswordData({
                ...props.passwordData,
                oldPassword: value
              })}
              value={props.passwordData.oldPassword}
              containerStyle={styles.display}
              secureTextEntry={false}
              placeholder={"Old Password"}
              InputHeading={'Password'}
              eye={true}
            />
            <Input
              onChangeText={(value) => props.setPasswordData({
                ...props.passwordData,
                newPassword: value
              })}
              value={props.passwordData.newPassword}
              containerStyle={styles.display}
              secureTextEntry={false}
              placeholder={"New Password"}
              InputHeading={'Password'}
              eye={true}
            />
            <Input
              onChangeText={(value) => props.setPasswordData({
                ...props.passwordData,
                confirmPassword: value
              })}
              value={props.passwordData.confirmPassword}
              containerStyle={styles.display}
              secureTextEntry={false}
              placeholder={"Confirm Password"}
              InputHeading={'Password'}
              eye={true}
            />
          </View>
          <View style={{ flex: 2, paddingVertical: 15, justifyContent: 'flex-end', paddingHorizontal: 20 }}>
            <Button
              buttonText={"Update Password"}
              onPress={() => props._handleUpdate()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
export default ChangePassword;
