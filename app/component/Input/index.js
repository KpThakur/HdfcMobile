import React, { Fragment, useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { TEXT_INPUT_PLACEHOLDER_COLOR } from '../../utils/constant'
const Input = React.forwardRef((props, i) => {
    const [eye, setEye] = useState(false);
    const {
        autoCapitalize, autoFocus, keyboardType, multiline,
        placeholder, returnKeyType, value,
        onChangeText, textInputStyle, onPressOut,
        containerStyle, blurOnSubmit, editable,
        numberOfLines, maxLength, minLength, onSubmitEditing, InputHeading
    } = props;
    const {
        container, textInput,
    } = style;
    function onPressEye(params) {
        setEye(!eye)
    }
    return (
        <Fragment>
            <View style={[container, containerStyle]}>
                {
                    (InputHeading === "Search") &&
                    <TouchableOpacity
                        style={{
                            height: 50, width: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => onPressEye()}>
                        <Image
                            source={
                                require('../../assets/images/search.png')}
                        />
                    </TouchableOpacity>
                }
                <TextInput
                    blurOnSubmit={blurOnSubmit}
                    minLength={minLength}
                    numberOfLines={numberOfLines}
                    maxLength={maxLength}
                    onChangeText={(text) => onChangeText(text)}
                    autoCapitalize={autoCapitalize}
                    autoFocus={autoFocus}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    secureTextEntry={eye}
                    // ref={ref => ref && ref.setNativeProps({ style: { fontFamily: FONT_FAMILY_REGULAR } })}
                    //  ref={ref => ref && ref.setNativeProps()}
                    placeholder={placeholder}
                    returnKeyType={returnKeyType}
                    value={value}
                    placeholderTextColor={TEXT_INPUT_PLACEHOLDER_COLOR}
                    selectionColor={TEXT_INPUT_PLACEHOLDER_COLOR}
                    style={[textInput, textInputStyle]}
                    editable={editable}
                    onSubmitEditing={onSubmitEditing}
                    onPressOut={onPressOut}
                />
                {
                    (InputHeading === "Password") &&
                    <TouchableOpacity
                        style={{
                            height: 50, width: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => onPressEye()}>
                        <Image
                            source={
                                eye ?
                                    require('../../assets/images/eye.png') :
                                    require('../../assets/images/closeeye.png')
                            } />
                    </TouchableOpacity>
                }
            </View>
        </Fragment>
    );
})
Input.defaultProps = {
    secureTextEntry: false,
    keyboardType: "default",
    value: "",
};
const style = StyleSheet.create({
    container: {
        height: Platform.OS == "ios" ? 45 : 55,
        borderRadius: 6,
        backgroundColor: "blue",
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
    },
    textInput: {
        fontSize: 15,
        // fontFamily: FONT_FAMILY_REGULAR,
        paddingLeft: 10,
        // color: TEXT_INPUT_COLOR,
        color: "black",
        width: '90%'
    }
})
export default Input;