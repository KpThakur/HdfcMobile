import React from 'react';
import AuditWelcomeScreenView from './component/AuditWelcomeScreen';

const AuditWelcomeScreen = ({navigation}) => {
    const handleStartAudit=()=>{
        navigation.navigate("NotifyScreen")
    }
    return (<AuditWelcomeScreenView handleStartAudit={handleStartAudit}/>)
}
export default AuditWelcomeScreen;
