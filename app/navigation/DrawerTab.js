import AsyncStorage from '@react-native-community/async-storage'
import React, { useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { BRAND_ICON, PRIMARY_BLUE_COLOR, DASHBOARD, WHITE_BG_COLOR, FONT_FAMILY_REGULAR, MEDIUM_FONT_SIZE, LOGOUT_ICON } from '../utils/constant'
import { normalize } from '../utils/scaleFontSize'
import { AuthContext } from '../utils/UserContext'
export default function DrawerTab({ navigation }) {
    const {signOut}=useContext(AuthContext)
    
    const handleLogOut = () => {
        signOut()
        navigation.closeDrawer()
        
    }
    return (
        <View style={{ flexGrow: 1, paddingLeft: 10 }}>
            <Image source={BRAND_ICON} style={{ width: 150, height: 80, resizeMode: "contain" }} />

            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }} onPress={() => { navigation.push("DashboardScreen") }}>
                <Image source={DASHBOARD} style={{ marginRight: 10 }} />
                <Text style={{
                    color: WHITE_BG_COLOR, fontFamily: FONT_FAMILY_REGULAR
                    , fontSize: normalize(MEDIUM_FONT_SIZE)
                }}>Dashboard</Text>
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
    )
}
