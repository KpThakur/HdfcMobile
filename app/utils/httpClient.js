import React, { useState, useContext } from "react";
import axios from "axios";
import { BASEURL, MAP_KEY } from "./constant";
import AsyncStorage from "@react-native-community/async-storage";
//import { AuthContext } from '../Components/AuthContext';
// import NetInfo from "@react-native-community/netinfo";
// import { Alert, Platform } from 'react-native';

const httpClient = axios.create({
  baseURL: `${BASEURL}`,
});
export const httpClientMultipart = axios.create({
  baseURL: `${BASEURL}`,
  headers: {
    "Accept": "application/json",
    "Content-Type": "multipart/form-data",
  },
});
export function setDefaultHeader(header, value) {
  httpClient.defaults.headers.common[header] = value;
  httpClientMultipart.defaults.headers.common[header] = value;
}
export async function apiCall(
  method,
  url,
  data,
  header = { "Content-Type": "application/json" }
) {
  // console.log('url: ', url);
  try {
    // if (Platform.OS === "android") {
    //     NetInfo.fetch().then(async (isConnected) => {
    //         if (isConnected.isConnected) {
    const res = await httpClient({
      method,
      url,
      data: data,
      headers: header,
      withCredentials: false,
    });
    // console.log('res: ', res);
    return res;
    //     } else {
    //         Alert.alert("You are offline!");
    //     }
    // })
    // }
  } catch (error) {
    console.log("API: ",url ,"  error: ", {
      config: error.response?.config?.data || {},
      data: error?.response?.data || {},
    });
    if (error.response) {
      if (error.response.status === 401) {
        console.log("error: api ", error.response);
        return error.response;
      }
      if (error.response.status === 403) {
        AsyncStorage.removeItem("userToken");
        return error.response;
      }
      if (error.response.status === 404) {
        console.log(
          error.response?.config?.data,
          " :error: api ",
          error.response.data
        );
        return error.response;
      }
      if (error.response.status === 400) {
        return error.response;
      }
      if (error.response.status === 408) {
        return error.response;
      }
      if (error.response.status === 500) {
        console.log("error: error.response ", error.response?.data);
        return error.response;
      }
    }
    // else if (error.request) {
        console.log('Error request : ', error.request,error);
    // } else {
    //     console.log('Error message : ', error.message);
    // }
    // just comment for internal server error (*)
    return {
      data: {
        status: 500,
        message:
          "The server encountered an internal error and was unable to complete your request.Please try again.",
        errMsg: error?.message,
        request: error?.request,
      },
    };
  }
}

export async function apiCallAgora() {
  try {
    // if (Platform.OS === "android") {
    //     NetInfo.fetch().then(async (isConnected) => {
    //         if (isConnected.isConnected) {
    const res = await httpClient({
      method: "",
      url: "https://api.agora.io/v1/apps/b13f7540466747e6a102327255673a59/cloud_recording/acquire",
      data: {
        cname: "httpClient463224",
        uid: "0",
        clientRequest: {
          resourceExpiredHour: 24,
          scene: 0,
        },
      },
      headers: { "Content-type": "application/json;charset=utf-8" },
    });
    return res;
    //     } else {
    //         Alert.alert("You are offline!");
    //     }
    // })
    // }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        return error.response;
      }
      if (error.response.status === 403) {
        return error.response;
      }
      if (error.response.status === 404) {
        return error.response;
      }
      if (error.response.status === 400) {
        return error.response;
      }
      if (error.response.status === 408) {
        return error.response;
      }
      if (error.response.status === 500) {
        return error.response;
      }
    } else if (error.request) {
      console.log("Error request : ", error.request);
    } else {
      console.log("Error message : ", error.message);
    }
    // just comment for internal server error (*)
    return { data: { status: 500, message: "Internal server error" } };
  }
}

export async function getLocation(latitude, longitude)
{
  try{
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAP_KEY}`);
     if (response.data.results.length > 0)
     {
       const locationName = response.data.results[0].formatted_address;
      //  setData(locationName);
       console.log("Resposne ------>>>",locationName);
       return locationName;
     }
   
  }catch(error)
  {
     console.error("Error in getting data :- ", error);
  }
}