import { StyleSheet,Dimensions } from "react-native"
import { DARK_BLUE_COLOR,PRIMARY_BLUE_COLOR,LARGE_FONT_SIZE,TINY_FONT_SIZE } from "../../../../utils/constant"
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
        justifyContent:"space-evenly"
        
    },
    header:{
        fontSize:normalize(LARGE_FONT_SIZE),
        fontWeight:"700",
        color:DARK_BLUE_COLOR
    },
    text_field:{
        backgroundColor:"#eee",
        borderRadius:20,
        width:"100%",
        marginVertical:10,
        paddingLeft:20,
        color:"gray"
    },
    p_txt:{
        color:PRIMARY_BLUE_COLOR,
        fontSize:normalize(12)
    },
    txt:{
        color:"#000",
        fontSize:normalize(TINY_FONT_SIZE)
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
        right: 20, 
        top: 30
    },
    btn_view:{
        paddingVertical:20
    },
    check_icon:{
        width: 20, 
        height: 20,
        resizeMode:"contain",
        marginRight:5
    }
})
