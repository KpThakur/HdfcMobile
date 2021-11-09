import { StyleSheet } from "react-native"
import { FONT_FAMILY_REGULAR, MEDIUM_FONT_SIZE } from "../../../../utils/constant"
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
    }
})
