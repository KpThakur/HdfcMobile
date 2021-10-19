import { StyleSheet } from "react-native"
import { DARK_BLUE_COLOR, PRIMARY_BLUE_COLOR } from '../../../../utils/constant'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        ustifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    box: {
        marginVertical: 15,
        width: "100%",
        borderRadius: 20,
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
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        marginLeft: 18,
        marginRight: 18
    },
    header_txt: {
        color: "#fff",
        fontSize: 18
    },
    box_body: {
        padding: 20
    },
    txt: {
        fontSize: 18,
        color: "#000"
    },
    p_txt: {
        color: PRIMARY_BLUE_COLOR,
        fontSize: 16
    },
    img: {
        width: 20,
        height: 20,
        resizeMode: "contain",
        marginRight: 5
    },
    s_txt: {
        fontSize: 14
    },
    cancel_btn: {
        backgroundColor: "gray",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20,
        marginRight: 5
    },
    prim_btn: {
        backgroundColor: PRIMARY_BLUE_COLOR,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20
    }
})

