import { StyleSheet } from "react-native";
import { normalize } from '../../../../component/scaleFontSize';
import { FONT_FAMILY_REGULAR, FONT_FAMILY_SEMI_BOLD, GREY_TEXT_COLOR, LARGE_FONT_SIZE, MAIN_BG_GREY_COLOR, MEDIUM_FONT_SIZE, PRIMARY_BLUE_COLOR, WHITE_BG_COLOR } from '../../../../utils/constant';
export const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: MAIN_BG_GREY_COLOR
    },
    txt: {
        fontFamily: FONT_FAMILY_SEMI_BOLD,
        fontSize: normalize(LARGE_FONT_SIZE),
        color: PRIMARY_BLUE_COLOR,
        textAlign: 'center',
        paddingTop: 30
    }
})
