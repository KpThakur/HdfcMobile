import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
// import { AuthContext, DriverStatusContext, LanguageContext, UserContext } from '../utils/context';


//Screen
import LoginScreen from '../screen/Authentication/Login';
import ScheduleNewAuditScreen from '../screen/App/ScheduleNewAudit';
import MerchandisingAuditScreen from '../screen/App/MerchandisingAudit';
import DashboardScreen from '../screen/App/Dashboard';
const App = createStackNavigator();
const Stack = createStackNavigator();

function AppStack() {
    return (
        <App.Navigator screenOptions={{ headerShown: false }} >
            <App.Screen name="DashboardScreen" component={DashboardScreen} />
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