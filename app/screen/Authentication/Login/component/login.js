import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { styles } from './styles'
import Button from '../.../../../../../component/Button'
import { FONT_FAMILY_BOLD, GREY_TEXT_COLOR, STATUS_BAR_COLOR } from "../../../../utils/constant";
import { BRAND_ICON, HEROIC_ICON, EYE, EYE_CLOSE, CHECKED, UNCHECKED } from '../../../../utils/constant';
const LoginScreen = (props) => {
    const {handleLogin,email,password,setemail,setpassword
        ,IsLoading,errorMessage,ShowAlert
    }=props
    const [isSecure, setisSecure] = useState(true)
    const [isChecked, setisChecked] = useState(false)
    const handlePassword = () => {
        setisSecure(!isSecure)
    }
    const handleCheck = () => {
        setisChecked(!isChecked)
    }
    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={styles.container}>
            <StatusBar backgroundColor={STATUS_BAR_COLOR}/>
                <Image source={BRAND_ICON} style={styles.brand_img} />
                <Image source={HEROIC_ICON} style={styles.img} />
                <Text style={styles.header}>Login</Text>
                <View style={{ width: '100%' }}>
                    <View>
                        <TextInput placeholder="Email  Address / Employee ID" style={styles.text_field} 
                        placeholderTextColor={{color:"black"}} value={email} onChangeText={text=>setemail(text)}/>
                    </View>
                    <View>
                        <TextInput placeholder="Password" secureTextEntry={isSecure} style={styles.text_field} 
                        placeholderTextColor={{color:"black"}} value={password} onChangeText={text=>setpassword(text)}/>
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
                        <Button buttonText="Log in" onPress={handleLogin}/>
                    </View>
                </View>
            </View>
            </ScrollView>
        
    )
}
export default LoginScreen;