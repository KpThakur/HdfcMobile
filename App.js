import React from 'react';
import { View } from 'react-native';
import Navigation from './app/navigation';
import { EditAuditProvider } from './app/utils/EditAuditContext';
import { QuestionProvider } from './app/utils/QuestionContext';
import { UserProvider } from './app/utils/UserContext';
function App() {

  return (
    <View style={{ flex: 1 }}>
      <UserProvider>
        <QuestionProvider>
          <EditAuditProvider>
          <Navigation />
          </EditAuditProvider>
        </QuestionProvider>
      </UserProvider>
    </View>
  );
};
export default App;
