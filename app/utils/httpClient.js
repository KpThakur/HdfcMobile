import React, { useState, useContext } from 'react';
import axios from 'axios';
 import { BASEURL } from './constant';
//import { AuthContext } from '../Components/AuthContext';
// import NetInfo from "@react-native-community/netinfo";
// import { Alert, Platform } from 'react-native';

const httpClient = axios.create({
    baseURL: `${BASEURL}`,
});
export function setDefaultHeader(header, value) {
    httpClient.defaults.headers.common[header] = value
}
export async function apiCall(method, url, data, header = { 'Content-Type': 'application/json' }) {
    try {
        
        // if (Platform.OS === "android") {
        //     NetInfo.fetch().then(async (isConnected) => {
        //         if (isConnected.isConnected) {
        const res = await httpClient({
            method,
            url,
            data: data,
            headers: header,
            withCredentials: false
        })
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
            console.log('Error request : ', error.request);
        } else {
            console.log('Error message : ', error.message);
        }
        // just comment for internal server error (*)
        return { data: { status: 500, message: 'Internal server error' } }
    }
}

export async function apiCallAgora() {
    try {
        
        // if (Platform.OS === "android") {
        //     NetInfo.fetch().then(async (isConnected) => {
        //         if (isConnected.isConnected) {
        const res = await httpClient({
            method:"",
            url:'https://api.agora.io/v1/apps/b13f7540466747e6a102327255673a59/cloud_recording/acquire',
            data: {
                "cname": "httpClient463224",
                "uid": "0",
                "clientRequest":{
                  "resourceExpiredHour": 24,
                  "scene": 0
               }
              },
            headers: {'Content-type':'application/json;charset=utf-8'},
            
        })
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
            console.log('Error request : ', error.request);
        } else {
            console.log('Error message : ', error.message);
        }
        // just comment for internal server error (*)
        return { data: { status: 500, message: 'Internal server error' } }
    }
}