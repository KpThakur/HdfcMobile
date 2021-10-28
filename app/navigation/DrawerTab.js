import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation ,DrawerActions} from '@react-navigation/core'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import React, { useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { BRAND_ICON, PRIMARY_BLUE_COLOR, DASHBOARD, WHITE_BG_COLOR, FONT_FAMILY_REGULAR, MEDIUM_FONT_SIZE, LOGOUT_ICON } from '../utils/constant'
import { normalize } from '../utils/scaleFontSize'
import { AuthContext } from '../utils/UserContext';

export default function DrawerTab(props) {
    const { signOut } = useContext(AuthContext)

    const navigation = useNavigation()
    const handleLogOut = () => {
        signOut()
        // navigation.closeDrawer()
        navigation.dispatch(DrawerActions.closeDrawer());
    }
    function _handleChangePassword(params) {
        navigation.navigate("ChangePassword")
    }
    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: PRIMARY_BLUE_COLOR }}>
            <View style={{ flexGrow: 1, paddingHorizontal: 20 }}>
                <Image source={BRAND_ICON} style={{ width: 150, height: 80, resizeMode: "contain" }} />

                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }} onPress={() => { navigation.navigate("DashboardScreen") }}>
                    <Image source={DASHBOARD} style={{ marginRight: 10 }} />
                    <Text style={{
                        color: WHITE_BG_COLOR, fontFamily: FONT_FAMILY_REGULAR
                        , fontSize: normalize(MEDIUM_FONT_SIZE)
                    }}>Dashboard</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
                    onPress={() => _handleChangePassword()}
                >
                    <Image source={require('../assets/images/padlock.png')} style={{ marginRight: 10, tintColor: "#ffffff", width: 20, height: 20 }} />
                    <Text style={{
                        color: WHITE_BG_COLOR, fontFamily: FONT_FAMILY_REGULAR
                        , fontSize: normalize(MEDIUM_FONT_SIZE)
                    }}>Change password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
                    onPress={() => handleLogOut()}
                >
                    <Image source={LOGOUT_ICON} style={{ marginRight: 10 }} />
                    <Text style={{
                        color: WHITE_BG_COLOR, fontFamily: FONT_FAMILY_REGULAR
                        , fontSize: normalize(MEDIUM_FONT_SIZE)
                    }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    )
}
