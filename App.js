import React from 'react';
import { View } from 'react-native';
import Navigation from './app/navigation';
import { UserProvider } from './app/utils/UserContext';
function App() {

  return (
    <View style={{ flex: 1 }}>
      <UserProvider>

      <Navigation />
      </UserProvider>
    </View>
  );
};
export default App;
