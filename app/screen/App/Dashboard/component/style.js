import { Platform, StyleSheet } from "react-native"
import { DARK_BLUE_COLOR, FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMI_BOLD, FONT_FAMILY_THIN, PRIMARY_BLUE_COLOR, SMALL_FONT_SIZE, TINY_FONT_SIZE } from '../../../../utils/constant'
import { normalize } from "../../../../utils/scaleFontSize"
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        ustifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff"
    },
    nav: {
        marginHorizontal: 10,
        marginVertical: Platform.OS == "ios" ? 15 : 0,
        backgroundColor: "#fff",
        paddingVertical: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        marginTop: Platform.OS == "ios" ? 15 : 5
    },
    display_audit: {
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        marginVertical: 10,
        backgroundColor: "#fff"
    },
    box: {
        marginVertical: 15,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: 'gray',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 1,
    },
    box_header: {
        backgroundColor: DARK_BLUE_COLOR,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },
    box_header_new: {
        backgroundColor: PRIMARY_BLUE_COLOR,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },
    header_txt: {
        color: "#fff",
        fontFamily: FONT_FAMILY_SEMI_BOLD,
        fontSize: normalize(SMALL_FONT_SIZE)
    },
    box_body: {
        padding: 10,
        backgroundColor: "#fff",
    },
    txt: {
        fontSize: normalize(SMALL_FONT_SIZE),
        color: "#000",
        fontFamily: FONT_FAMILY_REGULAR
    },
    p_txt: {
        color: PRIMARY_BLUE_COLOR,
        fontSize: normalize(SMALL_FONT_SIZE),
        fontFamily: FONT_FAMILY_REGULAR
    },
    img: {
        width: 15,
        height: 15,
        resizeMode: "contain",
        marginRight: 5
    },
    s_txt: {
        fontSize: normalize(TINY_FONT_SIZE)
    },
    cancel_btn: {
        backgroundColor: "gray",
        paddingVertical: 5,
        borderRadius: 20,
        alignItems: "center",
        paddingHorizontal: 15,
        marginRight: 5
    },
    prim_btn: {
        backgroundColor: PRIMARY_BLUE_COLOR,
        paddingVertical: normalize(5),
        borderRadius: normalize(20),
        paddingHorizontal: normalize(15),
        alignItems: "center",
    }
})

