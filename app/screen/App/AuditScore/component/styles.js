import { StyleSheet, Dimensions } from "react-native"
import { BORDER_COLOR, SEMI_FONT_SIZE, FONT_FAMILY_REGULAR, MAIN_BG_GREY_COLOR, PRIMARY_BLUE_COLOR, WHITE_BG_COLOR, SMALL_FONT_SIZE, MEDIUM_FONT_SIZE, LARGE_FONT_SIZE, EXTRA_LARGE_FONT_SIZE, MEGA_LARGE_FONT_SIZE, GREY_TEXT_COLOR } from '../../../../utils/constant'
import { normalize } from '../../../../utils/scaleFontSize'
const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height
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
        backgroundColor: WHITE_BG_COLOR,
        justifyContent: "space-evenly",
    },
    score_board: {
        backgroundColor: PRIMARY_BLUE_COLOR,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 300,
        height: WindowWidth / 2.5,
        width: WindowHeight / 4,
        borderColor: BORDER_COLOR,
        borderWidth: 10,
        marginTop: 20,
    },
    heroic_txt: {
        color: PRIMARY_BLUE_COLOR,
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: normalize(SEMI_FONT_SIZE),
        textAlign: 'center',
        fontWeight: "700",
        // marginTop:10
    },
    txt: {
        color: "#000",
        fontSize: normalize(SMALL_FONT_SIZE),
        fontFamily: FONT_FAMILY_REGULAR,
        letterSpacing: 1
    },
    display_score: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginVertical: 5,
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        backgroundColor: "#fff"
    },
    s_txt: {
        color: PRIMARY_BLUE_COLOR,
        fontSize: normalize(SMALL_FONT_SIZE),
        fontFamily: FONT_FAMILY_REGULAR
    },
    prev_audit: {
        paddingHorizontal: 10,
        height: 200
    },
    hs_txt: {
        color: WHITE_BG_COLOR,
        fontSize: normalize(SMALL_FONT_SIZE),
        fontWeight: "700",
    },
    hsn_txt: {
        color: WHITE_BG_COLOR,
        fontSize: normalize(40),
        fontWeight: "700",
        letterSpacing: 1
    }
})
