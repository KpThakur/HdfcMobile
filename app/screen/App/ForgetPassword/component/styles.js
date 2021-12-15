import { StyleSheet } from 'react-native';
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
})
export default Styles;