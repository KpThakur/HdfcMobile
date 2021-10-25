import { StyleSheet } from 'react-native';
import { normalize } from '../scaleFontSize';
import { WHITE_BG_COLOR, PRIMARY_BTN_COLOR, FONT_FAMILY_SEMI_BOLD } from '../../utils/constant';

const BaseStyle = StyleSheet.create({

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 11,
        borderRadius: 30,
        flexDirection: 'row',
        marginHorizontal: 10
    },

    
    buttonLabel: {
        fontSize: normalize(15),
        fontFamily: FONT_FAMILY_SEMI_BOLD,
    },

});

export const ButtonStyle = StyleSheet.create({
    primaryButton: {
        ...BaseStyle.button,
        backgroundColor: PRIMARY_BTN_COLOR
    },

    primaryButtonLabel: {
        ...BaseStyle.buttonLabel,
        color: WHITE_BG_COLOR,
    },

    terButton: {
        ...BaseStyle.button,
        backgroundColor: 'green'
    },

    terButtonLabel: {
        ...BaseStyle.buttonLabel,
        color: 'green',
    },

    secondaryButton: {
        ...BaseStyle.button,
        backgroundColor: 'yellow',
    },

    secondaryButtonLabel: {
        ...BaseStyle.buttonLabel,
        color: 'yellow',
    },

});