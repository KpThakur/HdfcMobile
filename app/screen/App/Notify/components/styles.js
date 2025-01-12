import { StyleSheet } from "react-native"
import { DARK_BLUE_COLOR, PRIMARY_BLUE_COLOR } from '../../../../utils/constant'
export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainvwe: { flex: 1 },
    centfrstvwe: {
        // flex: 2,
        backgroundColor:"green",
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
    body: { flex: 4 },
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
        backgroundColor: '#fff',
        elevation: 0.3,
        margin: 8,
        height: 38
    },
    brnachnme: {
        flex: 4, margin: 4,
        paddingLeft: 12,
    },
    branname: {
        fontSize: 15,
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
    }
})
