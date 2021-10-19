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
import ProfileScreen from '../screen/App/Profile';
import BranchNameScreen from '../screen/App/BranchName';
import BranchStartCallScreen from '../screen/App/BranchStartCall';

import NetworkCheckScreen from '../screen/App/NetworkCheckScreen';
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
            <Tab.Screen name="NetworkCheckScreen" component={NetworkCheckScreen} />
            <Tab.Screen name="MerchandisingAudit" component={MerchandisingAuditScreen} />
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
      
        </Tab.Navigator>
    )
};

function AppStack() {
    return (
        <App.Navigator screenOptions={{ headerShown: false }} >
            {/* <App.Screen name="ProfileScreen" component={ProfileScreen} /> */}
            <App.Screen name="BranchNameScreen" component={BranchNameScreen} />
            <App.Screen name="BranchStartCallScreen" component={BranchStartCallScreen} />
            <App.Screen name="DashboardScreen" component={DashboardScreen} />
            <App.Screen name="NetworkCheckScreen" component={TabStack} />

            <App.Screen name="Login" component={LoginScreen} />
            <App.Screen name="new_audit" component={ScheduleNewAuditScreen} />
            <App.Screen name="merchandising_audit" component={MerchandisingAuditScreen} />
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