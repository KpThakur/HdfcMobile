import { StyleSheet } from "react-native"
import { FONT_FAMILY_REGULAR, GREY_TEXT_COLOR,PRIMARY_BLUE_COLOR,SMALL_FONT_SIZE } from "../../../../utils/constant"
import {normalize} from '../../../../utils/scaleFontSize'
export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    main:{
        padding:20,
    },
    head:{
        backgroundColor:GREY_TEXT_COLOR,
        width:"100%",
        height:300,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    },
    body:{
        paddingTop:20
    },
    txt:{
        color:"gray",
        fontFamily:FONT_FAMILY_REGULAR,
        letterSpacing:1
    },
    b_txt:{
        color:"#000",
        fontFamily:FONT_FAMILY_REGULAR,
        letterSpacing:1,
        fontSize:normalize(SMALL_FONT_SIZE)
    },
    img:{
        width:"100%",
        height:300,
        borderRadius:10
    },
    camera_icon:{
        backgroundColor:PRIMARY_BLUE_COLOR,
        borderRadius:100,
        position:"absolute",
        padding:10,
        bottom:1,
        right:1,
        marginBottom:10,
        marginRight:10
    },
    icon_img:{
        width:30,height:30,
        tintColor:"#fff",
        resizeMode:"contain"
    }

})
