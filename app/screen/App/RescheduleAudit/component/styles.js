import { StyleSheet } from "react-native"
import { FONT_FAMILY_REGULAR, MEDIUM_FONT_SIZE,PRIMARY_BLUE_COLOR,SMALL_FONT_SIZE } from "../../../../utils/constant"
import { normalize } from "../../../../utils/scaleFontSize"
export const styles = StyleSheet.create({
    contianer:{
        flex:1,
        backgroundColor:"#fff"
    },
    txt_head:{
        fontFamily:FONT_FAMILY_REGULAR,
        color:"#000",
        fontSize:normalize(MEDIUM_FONT_SIZE)
    },
    date_time:{
        flexDirection:'row',
        paddingVertical:10,
        alignItems:"center",
        paddingRight:50,
        paddingLeft:10,
        backgroundColor:"#ececec"
    },
    drop_down_item: {
        backgroundColor: "#fff",
        marginVertical: 5,
        padding: 10,
        shadowColor:"#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius:5
    },
    txt: {
        color: PRIMARY_BLUE_COLOR,
        fontSize: normalize(SMALL_FONT_SIZE)
    }
})

