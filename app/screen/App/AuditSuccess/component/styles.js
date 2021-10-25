import { StyleSheet } from "react-native";
import { normalize } from '../../../../component/scaleFontSize';
import { FONT_FAMILY_REGULAR, FONT_FAMILY_SEMI_BOLD, GREY_TEXT_COLOR, LARGE_FONT_SIZE, MAIN_BG_GREY_COLOR, MEDIUM_FONT_SIZE, PRIMARY_BLUE_COLOR, WHITE_BG_COLOR } from '../../../../utils/constant';
export const styles = StyleSheet.create({
    container:{
        flex: 1, backgroundColor: MAIN_BG_GREY_COLOR
    },
    main:{
        flex: 4, elevation: 2, margin: 20, borderRadius: 6, backgroundColor: WHITE_BG_COLOR, justifyContent: "flex-end", paddingBottom: 30 
    },
    img:{
        width: 300, height: 300 
    },
    txt:{
        fontFamily: FONT_FAMILY_SEMI_BOLD, fontSize: normalize(LARGE_FONT_SIZE), color: PRIMARY_BLUE_COLOR 
    }
})
