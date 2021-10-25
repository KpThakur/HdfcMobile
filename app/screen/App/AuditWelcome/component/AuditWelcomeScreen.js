import React from 'react';
import { View, Image, Text ,ScrollView} from 'react-native';
import Button from '../../../../component/Button';
import {styles} from './style'
import Header from '../../../../component/Header';
import {INSTRUCTION,HEADPHONE,WIFI,GROUP_17} from '../../../../utils/constant'
const AuditWelcomeScreen = (props) => {
    const {handleStartAudit}=props
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Header headerText={"WelCome Online Audit"}/>
                <View style={styles.main}>
                    <View style={{ alignItems: 'center' }}>
                        <Image resizeMode={"contain"} style={styles.img} source={INSTRUCTION} />
                        <Text style={styles.txt}>Welcome To Online Audit</Text>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.g_txt}>Following are the online/live audit requirement :</Text>

                        <View style={styles.icon_txt}>
                            <Image resizeMode={"contain"} style={styles.icon_img} source={HEADPHONE} />
                            <Text style={styles.g_txt}>Headphone</Text>
                        </View>
                        <View style={styles.icon_txt}>
                            <Image resizeMode={"contain"} style={styles.icon_img} source={WIFI} />
                            <Text style={styles.g_txt}>Good Network</Text>
                        </View>
                        <View style={styles.icon_txt}>
                            <Image resizeMode={"contain"} style={styles.icon_img} source={GROUP_17} />
                            <Text style={styles.g_txt}>Noise Free Surrounding</Text>
                        </View>
                    </View>
                    <Button
                        style={{ marginVertical: 20 }}
                        buttonText={"Start Audit"}
                        onPress={()=>handleStartAudit()}
                    />
                </View>
                <View style={{ flex: 2 }}>

                </View>
            </ScrollView>
        </View>
    )

}
export default AuditWelcomeScreen;
