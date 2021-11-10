import { Dimensions, StyleSheet } from "react-native"
import { DARK_BLUE_COLOR, FONT_FAMILY_REGULAR, FONT_FAMILY_THIN, GREY_TEXT_COLOR, PRIMARY_BLUE_COLOR, SMALL_FONT_SIZE, TINY_FONT_SIZE } from '../../../../utils/constant'
import { normalize } from '../../../../utils/scaleFontSize'
const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainvwe: { flex: 1, padding: 15 },
    centfrstvwe: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bluestreaming: {
        borderRadius: 20,
        backgroundColor: '#1b7dec',
        paddingVertical: 10,
        paddingHorizontal: 40
    },
    textstraming: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff'
    },
    body: { flex: 5 ,marginTop:10},
    teamcall: {
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    calltxt: {
        fontSize: 18,
        fontWeight: '500',
        color: '#707070'
    },
    brnchmannme: {
        flexDirection: 'row',
        margin: 8,
        height: 38,
        alignItems: "center",
        justifyContent: "center"
    },
    brnachnme: {
        flex: 4, margin: 4,
        paddingLeft: 12,
    },
    branname: {
        fontSize: normalize(SMALL_FONT_SIZE),
        fontFamily: FONT_FAMILY_REGULAR,
        fontWeight: '500',
        color: '#000'
    },
    offlinevwe: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    offiletxt: {
        fontSize: 15,
        fontWeight: '500',
        color: '#b9b9b9'
    },
    notifyvwe: {
        flex: 1,
        backgroundColor: '#1b7dec',
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        margin: 5,
        borderRadius: 10,
        paddingVertical: 2
    },
    notifylble: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ffffff'
    },
    star: {
        flexDirection: "row"
    },
    star_icon: {
        marginRight: 10
    },
    txt: {
        fontSize: normalize(12),
        fontFamily: FONT_FAMILY_REGULAR,
        color: "#000",
    },
    input: {
        backgroundColor: "#eee",
        padding: 10
    },
    img_sec: {
        // paddingHorizontal: 10,
        // marginVertical: 10,
    },
    sec_img: {
        width: 70,
        height: 70,
        borderRadius: 10
    },
    d_sec_img: {
        // width: 70,
        // height: 70,
        flexDirection:'row',
    },
    cross_icon: {
        // tintColor:PRIMARY_BLUE_COLOR,
        width: 70,
        height: 70,
        // borderRadius:30
    },
    info: {
        backgroundColor: "#fff",
        width: windowWidth - 100,
        height: windowHeight - 500,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'space-evenly',
        position: "absolute",
        right: 1,
        zIndex: 999,
        marginTop: 5,
        marginRight: 5
    },
    info_txt: {
        color: PRIMARY_BLUE_COLOR,
        fontFamily: FONT_FAMILY_REGULAR
    },
    info_ptxt: {
        color: "gray",
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: normalize(12)
    },
    drop_down_item: {
        backgroundColor: "#fff",
        marginVertical: 5,
        borderBottomWidth:0.5,
        borderBottomColor:"gray",
        padding: 10,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.20,
        // shadowRadius: 1.41,
        // elevation: 2,
        borderRadius: 5
    },
    drop_down_txt: {
        color: PRIMARY_BLUE_COLOR,
        fontSize: normalize(SMALL_FONT_SIZE)
    }
})
