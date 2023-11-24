import React from "react";
import { View } from "react-native";
import Navigation from "./app/navigation";
import { EditAuditProvider } from "./app/utils/EditAuditContext";
import { QuestionProvider } from "./app/utils/QuestionContext";
import { UserProvider } from "./app/utils/UserContext";
import NoNetworkBar from './app/component/NoNetworkBar';
function App() {
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
