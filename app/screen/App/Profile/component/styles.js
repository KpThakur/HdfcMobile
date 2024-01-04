import { StyleSheet } from "react-native"
import { MAIN_BG_GREY_COLOR, WHITE_BG_COLOR, GREY_TEXT_COLOR, MEDIUM_FONT_SIZE, SMALL_FONT_SIZE, FONT_FAMILY_REGULAR, TINY_FONT_SIZE } from "../../../../utils/constant"
import { normalize } from '../../../../utils/scaleFontSize'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MAIN_BG_GREY_COLOR
    },
    main: {
        flex: 4,
        elevation: 2,
        margin: 20,
        borderRadius: 6,
        backgroundColor: WHITE_BG_COLOR
    },
    display: {
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 3,
        backgroundColor:"#fff"
    },
    txt: {
        color: "gray",
        fontSize: normalize(TINY_FONT_SIZE),
        fontFamily: FONT_FAMILY_REGULAR
    },
    b_txt: {
        color: "#000",
        fontSize: normalize(SMALL_FONT_SIZE),
        fontFamily: FONT_FAMILY_REGULAR
    }
})
