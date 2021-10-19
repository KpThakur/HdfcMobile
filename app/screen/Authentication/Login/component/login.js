import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import Button from '../.../../../../../component/Button'
import { FONT_FAMILY_BOLD } from "../../../../utils/constant";
import { BRAND_ICON, HEROIC_ICON, EYE, EYE_CLOSE, CHECKED, UNCHECKED } from '../../../../utils/constant';
const LoginScreen = () => {
    const [isSecure, setisSecure] = useState(true)
    const [isChecked, setisChecked] = useState(false)
    const handlePassword = () => {
        setisSecure(!isSecure)
    }
    const handleCheck = () => {
        setisChecked(!isChecked)
    }
    return (
        <ScrollView style={{ flex: 1, width: "100%" }}>
            <View style={styles.container}>
                <Image source={BRAND_ICON} style={styles.brand_img} />
                <Image source={HEROIC_ICON} style={styles.img} />
                <Text style={styles.header}>Login</Text>
                <View style={{ width: '100%' }}>
                    <View>
                        <TextInput placeholder="Email  Address / Employee ID" style={styles.text_field} />
                    </View>
                    <View>
                        <TextInput placeholder="Password" secureTextEntry={isSecure} style={styles.text_field} />
                        <TouchableOpacity onPress={() => handlePassword()}
                            style={styles.password_icon} >
                            {isSecure ?
                                <Image source={EYE_CLOSE} />
                                : <Image source={EYE} />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                            <TouchableOpacity onPress={() => handleCheck()} style={{ flexDirection:"row",alignItems:"center"}}>
                                {
                                    isChecked ?
                                        <Image source={CHECKED} style={styles.check_icon} /> :
                                        <Image source={UNCHECKED} style={styles.check_icon} />
                                }
                                <Text style={styles.txt}>Keep Me Sign in</Text>
                            </TouchableOpacity>
                        <TouchableOpacity><Text style={styles.p_txt}>Forget Password ?</Text></TouchableOpacity>
                    </View>
                    <View style={styles.btn_view}>
                        <Button title="Log in" />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
export default LoginScreen;