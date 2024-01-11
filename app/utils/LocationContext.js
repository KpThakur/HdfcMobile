import React, {useState, createContext} from 'react';
export const LocationContext = createContext();
export const LocationProvider = props => {
  const [location, setLocation] = useState({lat: 24444, long: 566666 });
  const setLocationCordinates = (latitude, longitude) => {
    setLocation({ ...location,lat:latitude, long: longitude });
  };
  return (
    <LocationContext.Provider value={{location, setLocationCordinates}}>
      {props.children}
    </LocationContext.Provider>
  );
};
