import React, { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Header from '../../../../component/Header'
import { styles } from './styles'
import Button from '../../../../component/Button';
import Input from '../../../../component/Input';
import { useNavigation, DrawerActions } from '@react-navigation/native';

export default function Profile(props) {
    const navigation = useNavigation()
    const OnpressDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    }
   
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Header headerText={"Profile"} onPress={() => OnpressDrawer()} />
                <View style={styles.main}>
                    <Input
                        placeholder={"First Nsame"}
                        containerStyle={styles.display}
                        onChangeText={(value) => props.setProfileData({
                            ...props.profileData,
                            firstName: value
                        })}
                        value={props.profileData.firstName}
                    />
                   
                    <Input
                        placeholder={"Email"}
                        containerStyle={styles.display}
                        onChangeText={(value) => props.setProfileData({
                            ...props.profileData,
                            email: value
                        })}
                        value={props.profileData.email}
                        editable={false}
                        />
                    {/* <Input
                        placeholder={"Contact Number"}
                        containerStyle={styles.display}
                        onChangeText={(value) => props.setProfileData({
                            ...props.profileData,
                            phone: value
                        })}
                        keyboardType={"number-pad"}
                        value={props.profileData.phone.toString()}
                    /> */}
                    <View style={{ paddingTop: 290, paddingBottom: 10 }}>
                        <Button
                            onPress={() => props._handleSubmit()}
                            buttonText={"Submit"} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
