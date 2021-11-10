import { StyleSheet } from "react-native"
import { FONT_FAMILY_REGULAR, MEDIUM_FONT_SIZE, PRIMARY_BLUE_COLOR, SMALL_FONT_SIZE } from "../../../../utils/constant"
import { normalize } from "../../../../utils/scaleFontSize"
export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    main:{
        paddingHorizontal:15,
        paddingVertical:10,
    },
    h_txt:{
        fontSize:normalize(MEDIUM_FONT_SIZE),
        color:"#000",
        fontFamily:FONT_FAMILY_REGULAR,
        letterSpacing:1
    },
    drop_down_item: {
        backgroundColor: "#fff",
        marginVertical: 5,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 5
    },
    drop_down_txt: {
        color: PRIMARY_BLUE_COLOR,
        fontSize: normalize(SMALL_FONT_SIZE)
    }
})
