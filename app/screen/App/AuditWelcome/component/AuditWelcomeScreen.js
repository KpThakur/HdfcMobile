import React from 'react';
import { View, Image, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../../../component/Button';
import { normalize } from '../../../../component/scaleFontSize';
import { FONT_FAMILY_REGULAR, FONT_FAMILY_SEMI_BOLD, GREY_TEXT_COLOR, MAIN_BG_GREY_COLOR, PRIMARY_BLUE_COLOR, WHITE_BG_COLOR } from '../../../../utils/constant';
const AuditWelcomeScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: MAIN_BG_GREY_COLOR }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 4, elevation: 2, margin: 20, borderRadius: 6, backgroundColor: WHITE_BG_COLOR }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image resizeMode={"contain"} style={{ width: 300, height: 300 }} source={require('../../../../assets/images/Instruction.png')} />
                        <Text style={{ fontFamily: FONT_FAMILY_SEMI_BOLD, fontSize: normalize(17), color: PRIMARY_BLUE_COLOR }}>Welcome To Online Audit</Text>
                    </View>
                    <View style={{ paddingLeft: 15, paddingTop: 20 }}>
                        <Text style={{ color: GREY_TEXT_COLOR, fontSize: normalize(11), fontFamily: FONT_FAMILY_REGULAR }}>Following are the online/live audit requirement :</Text>

                        <View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
                            <Image resizeMode={"contain"} style={{ width: 18, height: 18 }} source={require('../../../../assets/images/headphones.png')} />
                            <Text style={{ paddingLeft: 10, color: GREY_TEXT_COLOR, fontSize: normalize(11), fontFamily: FONT_FAMILY_REGULAR }}>Headphone</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image resizeMode={"contain"} style={{ width: 18, height: 18 }} source={require('../../../../assets/images/wifi-line.png')} />
                            <Text style={{ paddingLeft: 10, color: GREY_TEXT_COLOR, fontSize: normalize(11), fontFamily: FONT_FAMILY_REGULAR }}>Good Network</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
                            <Image resizeMode={"contain"} style={{ width: 18, height: 18 }} source={require('../../../../assets/images/Group_107.png')} />
                            <Text style={{ paddingLeft: 10, color: GREY_TEXT_COLOR, fontSize: normalize(11), fontFamily: FONT_FAMILY_REGULAR }}>Noise Free Surrounding</Text>
                        </View>
                    </View>
                    <Button
                        style={{ marginTop: 30 }}
                        buttonText={"Start Audit"}
                    />
                </View>
                <View style={{ flex: 2 }}>

                </View>
            </ScrollView>
        </View>
    )

}
export default AuditWelcomeScreen;