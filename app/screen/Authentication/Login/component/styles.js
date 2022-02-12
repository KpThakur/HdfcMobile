import { StyleSheet,Dimensions } from "react-native"
import { DARK_BLUE_COLOR,PRIMARY_BLUE_COLOR,LARGE_FONT_SIZE,TINY_FONT_SIZE, FONT_FAMILY_REGULAR, GREY_TEXT_COLOR, FONT_FAMILY_SEMI_BOLD } from "../../../../utils/constant"
import {normalize} from '../../../../utils/scaleFontSize'
const WindowWidth=Dimensions.get('window').width
const WindowHeight=Dimensions.get('window').height
const ratio=WindowWidth
export const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        paddingHorizontal:30,
        backgroundColor:"white",
        justifyContent:"space-evenly",
    },
    header:{
        fontSize:normalize(LARGE_FONT_SIZE),
        fontWeight:"700",
        color:DARK_BLUE_COLOR,
        fontFamily:FONT_FAMILY_REGULAR
    },
    text_field:{
        backgroundColor:GREY_TEXT_COLOR,
        borderRadius:20,
        width:"100%",
        color:"gray",
        marginVertical:10,
        paddingLeft:20,
        paddingVertical:10,
        fontFamily:FONT_FAMILY_SEMI_BOLD,
    },
    p_txt:{
        color:PRIMARY_BLUE_COLOR,
        fontSize:normalize(TINY_FONT_SIZE),
        fontFamily:FONT_FAMILY_REGULAR
    },
    txt:{
        color:"#000",
        fontSize:normalize(TINY_FONT_SIZE),
        fontFamily:FONT_FAMILY_REGULAR
    },
    img:{
        width:WindowWidth,
        height:WindowHeight/3,
        marginVertical:20,
        resizeMode:"contain",
    },
    brand_img:{
        width: "50%", 
        resizeMode: "contain", 
        marginTop: 10
    },
    password_icon:{
        zIndex: 999, 
        width: 30, 
        height: 30, 
        resizeMode: 'contain', 
        position: "absolute", 
        right: 2, 
        top: 25
    },
    btn_view:{
        paddingVertical:20
    },
    check_icon:{
        width: 20, 
        height: 20,
        // resizeMode:"contain",
        marginRight:5
    }
})
