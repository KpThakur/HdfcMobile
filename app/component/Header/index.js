import React from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, StatusBar, Platform } from 'react-native';
//import { FONT_FAMILY_BOLD, THEME_BACKGROUND_SECONDRY_COLOR, MEDIUM_FONT_SIZE, THEME_NORMAL_SECONDRY_TEXT_COLOR } from '../../utils/constant';
import { FONT_FAMILY_REGULAR, STATUS_BAR_COLOR } from '../../utils/constant';
import { useNavigation, DrawerActions } from '@react-navigation/core';
const Header = (props) => {
    const {
        HeaderView, HeaderRightView, container
    } = styles;
    const {
        RightImage, showRightLabel, leftImg, leftNav, mncontainer, showleftimage, onPress,
        statusbarcolor, barStyle, showAppIcon, headerText, headerTextShouldMiddle
    } = props;
    return (
        <>
            <View style={[container, mncontainer]}>
                <StatusBar
                    backgroundColor={statusbarcolor}
                    barStyle={barStyle}
                    StatusBarStyle={'default'}
                />
                <View style={[HeaderView, { flex: headerTextShouldMiddle ? 3 : 4 }]}>
                    {showleftimage && <TouchableOpacity style={{ height: 60, width: 50, justifyContent: 'center', }}
                        onPress={onPress}
                    >
                        <Image
                            source={leftImg}
                        />
                    </TouchableOpacity>}
                    {/* {showAppIcon &&
                        <Image source={require('../../assets/images/Logoforhome.png')} />
                    } */}
                </View>
                {/* {headerTextShouldMiddle && */}
                <View style={[HeaderRightView, { flex: headerTextShouldMiddle ? 5 : 0 }]}>
                    <Text style={{ fontSize: 16, color: "white", fontFamily: FONT_FAMILY_REGULAR }}>{headerText}</Text>
                </View>
                {/* } */}
                <View
                    style={[HeaderRightView, { flex: headerTextShouldMiddle ? 3 : 4 }]}>
                    {showRightLabel &&
                        <Text style={{ color: "#1b7dec", paddingRight: 10, }}></Text>
                    }

                </View>
            </View>
        </>
    );
}
Header.defaultProps = {
    RightImage: require('../../assets/images/menu.png'),
    leftImg: require('../../assets/images/menu.png'),
    showleftimage: true,
    showAppIcon: true,
    showRightLabel: true,
    logOutType: 0,
    leftNav: false,
    statusbarcolor: STATUS_BAR_COLOR,
    headerTextShouldMiddle: false,
    headerText: "Common Name",

};
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#1b7dec",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        height: Platform.OS == "ios" ? 90 : 60,
        paddingTop: Platform.OS == "ios" ? 30 : 0
    },
    HeaderView: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',

    },
    HeaderRightView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
})
export default Header;