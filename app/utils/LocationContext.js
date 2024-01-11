import React, {useState, createContext} from 'react';
export const LocationContext = createContext();
export const LocationProvider = props => {
  const [location, setLocation] = useState({latitude: 24444, longitude: 566666 });
  const setLocationCordinates = (latitude, longitude) => {
    setLocation({ ...location,latitude:latitude, longitude: longitude });
  };
  return (
    <LocationContext.Provider value={{location, setLocationCordinates}}>
      {props.children}
    </LocationContext.Provider>
  );
};
