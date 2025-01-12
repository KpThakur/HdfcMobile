import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { normalize } from "../component/scaleFontSize";
import { FONT_FAMILY_REGULAR, GREY_TEXT_COLOR, PRIMARY_BLUE_COLOR,HOME_ICON,HOME_ICON_ACTIVE,PROFILE_ICON_ACTIVE,PROFILE_ICON,ADD_ICON_ACTIVE,ADD_ICON } from '../utils/constant';

function MyTabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', e => {
            e.preventDefault();
        });
        return unsubscribe;
    }, [navigation]);
    return (
        <View style={{
            flexDirection: 'row',
            height: 65,
            backfaceVisibility: 'visible',
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
            zIndex:999
        }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };
                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };
                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {
                            label === 'DashboardScreen' ?
                                <View style={styles.tabBarContain}>
                                    {isFocused ?
                                        <Image style={{ width: 20, height: 20}} source={HOME_ICON_ACTIVE} />
                                        :
                                        <Image style={{ width: 20, height: 20}} source={HOME_ICON} />
                                    }
                                    <Text style={{
                                        fontFamily: FONT_FAMILY_REGULAR,
                                        fontWeight: "500",
                                        color: isFocused === true ? PRIMARY_BLUE_COLOR : "#000",
                                        fontSize: normalize(11),
                                    }}>{"Home"}</Text>
                                </View>

                                : label === 'ScheduleNewAuditScreen' ?
                                    <View style={styles.tabBarContain}>
                                        {isFocused ?
                                            <Image style={{ width: 20, height: 20,resizeMode:"contain"}} source={ADD_ICON_ACTIVE} />
                                            :
                                            <Image style={{ width: 20, height: 20,resizeMode:"contain"}} source={ADD_ICON} />
                                        }
                                        <Text style={{
                                            fontFamily: FONT_FAMILY_REGULAR,
                                            fontWeight: "500",
                                            color: isFocused === true ? PRIMARY_BLUE_COLOR : "#000",
                                            fontSize: normalize(11),
                                        }}>{"Schedule Review"}</Text>
                                    </View>
                                    : label === 'Profile' ?
                                        <View style={styles.tabBarContain}>
                                            {isFocused ?
                                                <Image style={{ width: 20, height: 20 ,resizeMode:"contain"}} source={PROFILE_ICON_ACTIVE} />
                                                :
                                                <Image style={{ width: 20, height: 20,resizeMode:"contain"}} source={PROFILE_ICON} />
                                            }
                                            <Text style={{
                                                fontFamily: FONT_FAMILY_REGULAR,
                                                fontWeight: "500",
                                                color: isFocused === true ? PRIMARY_BLUE_COLOR : "#000",
                                                fontSize: normalize(11),
                                            }}>{"Profile"}</Text>
                                        </View>
                                        : null
                        }
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
export default MyTabBar;
const styles = StyleSheet.create({
    imageStyles: {
        width: 25,
        height: 25
    },
    tabBarContain: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatBotImage: {
        bottom: 20,
        width: 130,
        height: 130
    }
});
