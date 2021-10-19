import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { ButtonStyle } from "./commonBtnStyles";
const Button = (props) => {
    const {
        buttonText, style, buttonLabelStyle, onPress, disabled, buttonType, showBtnImage, btnLeftImage
    } = props;
    let btnStyle;
    let btnLabelStyle;
    switch (buttonType) {
        case "tertiary":
            btnStyle = ButtonStyle.terButton;
            btnLabelStyle = ButtonStyle.terButtonLabel;
            break;
        case "secondary":
            btnStyle = ButtonStyle.secondaryButton;
            btnLabelStyle = ButtonStyle.secondaryButtonLabel;
            break;
        case "primary":
        default:
            btnStyle = ButtonStyle.primaryButton;
            btnLabelStyle = ButtonStyle.primaryButtonLabel;
            break;
    }
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[btnStyle, style]}>
            {showBtnImage && <Image style={{ width: 25, height: 25, right: 10 }} source={btnLeftImage} />}
            <Text
                style={[btnLabelStyle, buttonLabelStyle]}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
}
Button.defaultProps = {
    buttonText: "Submit",
    buttonType: "primary"
};
export default Button;