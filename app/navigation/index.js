import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerTab from './DrawerTab'
import { UserContext, AuthContext } from '../utils/UserContext';
import { apiCall, setDefaultHeader } from '../utils/httpClient';
import ENDPOINTS from '../utils/apiEndPoints';
import AsyncStorage from '@react-native-community/async-storage';
//Screen
import LoginScreen from '../screen/Authentication/Login';
import ScheduleNewAuditScreen from '../screen/App/ScheduleNewAudit';
import DashboardScreen from '../screen/App/Dashboard';
import NotifyScreen from '../screen/App/Notify';
import QuestionScreen from '../screen/App/Question';
import AuditWelcomeScreen from '../screen/App/AuditWelcome';
import ProfileScreen from '../screen/App/Profile'
import MyTabBar from './tabBar';
import AuditScoreScreen from '../screen/App/AuditScore';
import ReviewAuditScreen from '../screen/App/ReviewAudit'
import ActionableScreen from '../screen/App/Actionable';
import AuditSuccessScreen from '../screen/App/AuditSuccess';
import Question1Screen from '../screen/App/Question 1'
import Question2Screen from '../screen/App/Question2'
import Question3Screen from '../screen/App/Question3'
import { PRIMARY_BLUE_COLOR } from '../utils/constant';
import ForgetPasswordScreen from '../screen/App/ForgetPassword';
const App = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const DashboardTab = createStackNavigator();
const Drawer = createDrawerNavigator();
const Auth = createStackNavigator();

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
            <Tab.Screen name="DashboardScreen" component={DashboardStack} />
            <Tab.Screen name="ScheduleNewAuditScreen" component={ScheduleNewAuditScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
};
function DashboardStack() {
    return (
        <DashboardTab.Navigator screenOptions={{ headerShown: false }}>
            <DashboardTab.Screen name="DashboardScreen" component={DashboardScreen} />
            <DashboardTab.Screen name="QuestionScreen" component={QuestionScreen} />
            <DashboardTab.Screen name="AuditWelcomeScreen" component={AuditWelcomeScreen} />
            <DashboardTab.Screen name="NotifyScreen" component={NotifyScreen} />
            <DashboardTab.Screen name="Profile" component={ProfileScreen} />
            <DashboardTab.Screen name="AuditScore" component={AuditScoreScreen} />
            <DashboardTab.Screen name="ReviewAduit" component={ReviewAuditScreen} />
            <DashboardTab.Screen name="Actionable" component={ActionableScreen} />
            <DashboardTab.Screen name="AuditSuccess" component={AuditSuccessScreen} />

            <DashboardTab.Screen name="Question1Screen" component={Question1Screen} />
            <DashboardTab.Screen name="Question2Screen" component={Question2Screen} />
            <DashboardTab.Screen name="Question3Screen" component={Question3Screen} />
        </DashboardTab.Navigator>)
}
function AppStack() {
    return (
        <App.Navigator screenOptions={{ headerShown: false }} initialRouteName={"DashboardScreen"}>
            <App.Screen name="DashboardScreen" component={DrawerStack} />
            <App.Screen name="ScheduleNewAuditScreen" component={ScheduleNewAuditScreen} />

            <App.Screen name="QuestionScreen" component={QuestionScreen} />
            <App.Screen name="AuditWelcomeScreen" component={AuditWelcomeScreen} />
            <App.Screen name="NotifyScreen" component={NotifyScreen} />
            <App.Screen name="Profile" component={ProfileScreen} />
            <App.Screen name="AuditScore" component={AuditScoreScreen} />
            <App.Screen name="ReviewAduit" component={ReviewAuditScreen} />
            <App.Screen name="Actionable" component={ActionableScreen} />
            <App.Screen name="AuditSuccess" component={AuditSuccessScreen} />
            <App.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
            <App.Screen name="Question1Screen" component={Question1Screen} />
            <App.Screen name="Question2Screen" component={Question2Screen} />
            <App.Screen name="Question3Screen" component={Question3Screen} />
        </App.Navigator>
    )
}
function DrawerStack() {
    return (
        <Drawer.Navigator initialRouteName="DashboardScreen"
            screenOptions={{
                headerShown: false, drawerStyle: {
                    backgroundColor: PRIMARY_BLUE_COLOR,
                    width: "50%"
                }
            }} drawerContent={(props) => <DrawerTab {...props} />}
        >
            <Drawer.Screen name="DashboardScreen" component={TabStack} />
        </Drawer.Navigator>
    )
}

const AuthStack = () => {

    return (
        <Auth.Navigator screenOptions={{ headerShown: false }} >
            <Auth.Screen name="Login" component={LoginScreen} />
        </Auth.Navigator>)

}

export default function Routes({ navigation }) {
    const [userData, setUserData] = useContext(UserContext)
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {

                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );



    React.useEffect(() => {
        setTimeout(() => { SplashScreen.hide() }, 3000)
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;
            try {
                userToken = await AsyncStorage.getItem('userToken');


                console.log('userToken: ', userToken);
                if (userToken === null) {
                    const response = await apiCall('GET', ENDPOINTS.GENERATE_TOKEN);
                    if (response.status === 200) {
                        await setDefaultHeader('token', response.data.token);
                    }
                }
                else {
                    const userData = await AsyncStorage.getItem('userData')
                    setUserData(JSON.parse(userData))
                    await setDefaultHeader('token', userToken);
                }
                //userToken ="abc";
            } catch (e) {
                console.log(': ', e);
                // Restoring token failed
            }
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async token => {
                const userToken = token;
                try {
                    await setDefaultHeader('token', userToken);
                    await AsyncStorage.setItem('userToken', userToken);

                } catch (e) {
                    console.log(e, "ERRROR");
                }
                dispatch({ type: 'SIGN_IN', token: userToken });
            },
            signOut: async () => {
                console.log("SINGOUT")
                try {

                    await AsyncStorage.removeItem('userToken');
                    await AsyncStorage.removeItem('userData');
                    // setUserData({})
                    const response = await apiCall('GET', ENDPOINTS.GENERATE_TOKEN);
                    await setDefaultHeader('token', response.data.token);
                    dispatch({ type: 'SIGN_OUT', token: response.data.token })
                } catch (e) {
                    console.log(e);
                }
            },
            signUp: async data => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                // dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );
    return (
        <NavigationContainer>
            <AuthContext.Provider value={authContext}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {console.log("state.userToken",state.userToken)}
                    {state.userToken === null ? (

                        <Stack.Screen name="Login" component={AuthStack} />
                    ) : (
                        <Stack.Screen name="App" component={AppStack} />
                    )}
                </Stack.Navigator>
            </AuthContext.Provider>
        </NavigationContainer>
    );
}