import { StyleSheet } from 'react-native';
import { MAIN_BG_GREY_COLOR, PRIMARY_BLUE_COLOR } from '../../../../utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewStyle: {
        flexGrow: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: MAIN_BG_GREY_COLOR
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
})
export default Styles;