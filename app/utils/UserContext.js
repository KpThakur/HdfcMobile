import React, { useState } from "react";
export const UserContext = React.createContext();
export const AuthContext = React.createContext();
export const UserProvider = (props) => {
    const [userData, setUserData] = useState([])
    return (
        <UserContext.Provider value={[userData, setUserData]}>
            {props.children}
        </UserContext.Provider>
    )
}


// export const LanguageContext = React.createContext();
// export const LanguageProvider = (props) => {
//     const [lanuageContext, setLanuageContext] = useState([])
//     return (
//         <LanguageContext.Provider value={[lanuageContext, setLanuageContext]}>
//             {props.children}
//         </LanguageContext.Provider>
//     )
// }