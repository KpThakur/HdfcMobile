import { StyleSheet } from "react-native";
import { normalize } from '../../../../component/scaleFontSize';
import { FONT_FAMILY_REGULAR, FONT_FAMILY_SEMI_BOLD, GREY_TEXT_COLOR, MAIN_BG_GREY_COLOR, PRIMARY_BLUE_COLOR, WHITE_BG_COLOR } from '../../../../utils/constant';
export const styles = StyleSheet.create({
    container:{
        flex: 1, backgroundColor: MAIN_BG_GREY_COLOR 
    },
    main:{
        flex: 4, elevation: 2, margin: 20, borderRadius: 6, backgroundColor: WHITE_BG_COLOR
    },
    img:{ width: 300, height: 300 },
    txt:{ fontFamily: FONT_FAMILY_SEMI_BOLD, fontSize: normalize(17), color: PRIMARY_BLUE_COLOR },
    body:{ paddingLeft: 15, paddingTop: 20 },
    g_txt:{ color: "gray", fontSize: normalize(11), fontFamily: FONT_FAMILY_REGULAR },
    icon_txt:{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' },
    icon_img:{ width: 18, height: 18 ,marginRight:5}
})
