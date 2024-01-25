import React, {useState, createContext} from 'react';
export const LocationContext = createContext();
export const LocationProvider = props => {
  const [location, setLocation] = useState({lat: 24444, long: 566666, adr : "Sanchar Nagar" });
  const setLocationCordinates = (latitude, longitude, address) => {
    setLocation({ ...location,lat:latitude, long: longitude, adr: address });
  };
  return (
    <LocationContext.Provider value={{location, setLocationCordinates}}>
      {props.children}
    </LocationContext.Provider>
  );
};

