import { StyleSheet } from "react-native"
import { GREY_TEXT_COLOR, PRIMARY_BLUE_COLOR, SMALL_FONT_SIZE } from '../../utils/constant'
import { normalize } from '../../utils/scaleFontSize'
export const styles = StyleSheet.create({
    drop_down_item: {
        backgroundColor: "#fff",
        marginVertical: 5,
        padding: 10,
        shadowColor:"#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius:5
    },
    txt: {
        color: PRIMARY_BLUE_COLOR,
        fontSize: normalize(SMALL_FONT_SIZE)
    }
})
