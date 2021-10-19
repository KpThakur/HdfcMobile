import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
//Screen
import LoginScreen from '../screen/Authentication/Login';
import ScheduleNewAuditScreen from '../screen/App/ScheduleNewAudit';
import MerchandisingAuditScreen from '../screen/App/MerchandisingAudit';
import DashboardScreen from '../screen/App/Dashboard';
import NotifyScreen from '../screen/App/Notify';
import QuestionScreen from '../screen/App/Question';
import AuditWelcomeScreen from '../screen/App/AuditWelcome';
import MyTabBar from './tabBar';
const App = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabStack(params) {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            listeners={({ navigation, route }) => ({
                tabPress: e => {
                    if (route.state && route.state.routeNames.length > 0) {
                        navigation.navigate('Device')
                    }
                },
            })}
            tabBar={props => <MyTabBar {...props} />}
        >
            <Tab.Screen name="AuditWelcomeScreen" component={AuditWelcomeScreen} />
            <Tab.Screen name="MerchandisingAudit" component={MerchandisingAuditScreen} />
            <Tab.Screen name="Dashboard" component={DashboardScreen} />

        </Tab.Navigator>
    )
};

function AppStack() {
    return (
        <App.Navigator screenOptions={{ headerShown: false }} >
            <App.Screen name="DashboardScreen" component={DashboardScreen} />
            <App.Screen name="ScheduleNewAuditScreen" component={ScheduleNewAuditScreen} />
            <App.Screen name="QuestionScreen" component={QuestionScreen} />
            <App.Screen name="AuditWelcomeScreen" component={TabStack} />
            <App.Screen name="NotifyScreen" component={NotifyScreen} />
            <App.Screen name="Login" component={LoginScreen} />
        </App.Navigator>
    )
}
function Routes() {
    React.useEffect(() => {
        setTimeout(() => { SplashScreen.hide() }, 3000)
    }, []);
    return (

        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="App" component={AppStack} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;