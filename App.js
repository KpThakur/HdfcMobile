import React, { useEffect } from "react";
import { View, PermissionsAndroid } from "react-native";
import Navigation from "./app/navigation";
import { EditAuditProvider } from "./app/utils/EditAuditContext";
import { QuestionProvider } from "./app/utils/QuestionContext";
import { UserProvider } from "./app/utils/UserContext";
import NoNetworkBar from './app/component/NoNetworkBar';

function App() {
  useEffect(()=> {
    requestCameraPermission();
  },[]);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          // title: 'Cool Photo App Camera Permission',
          // message:
          //   'Cool Photo App needs access to your camera ' +
          //   'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

 
  
  return (
    <View style={{ flex: 1 }}>
      <UserProvider>
        <QuestionProvider>
          <EditAuditProvider>
            <NoNetworkBar />
            <Navigation />
          </EditAuditProvider>
        </QuestionProvider>
      </UserProvider>
    </View>
  );
}
export default App;
