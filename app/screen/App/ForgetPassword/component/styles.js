import { StyleSheet } from 'react-native';
import { DARK_BLUE_COLOR, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMI_BOLD, PRIMARY_BTN_COLOR, WHITE_BG_COLOR } from '../../../../utils/constant';
import { normalize } from '../../../../utils/scaleFontSize';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    scrollViewStyle: {
        flexGrow: 1,
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
    touch: {
        alignSelf:'flex-end',
        marginHorizontal: normalize(10),
        marginTop: normalize(10),
        backgroundColor: PRIMARY_BTN_COLOR,
        width: normalize(75),
        borderRadius: normalize(12),
      },
      touchText: {
        color: WHITE_BG_COLOR,
        fontSize: normalize(10),
        fontFamily: FONT_FAMILY_REGULAR,
        textAlign: 'center',
        padding: 3,
      },
})
export default Styles;