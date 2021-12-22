import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../utils/UserContext";
import Profile from "./component/Profile";
import { apiCall } from "../../../utils/httpClient";
import apiEndPoints from "../../../utils/apiEndPoints";
import Loader from "../../../utils/Loader";
import AsyncStorage from "@react-native-community/async-storage";

export default function index() {
  const [userData, setUserData] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    userDetail()
  }, []);
  const userDetail = async () => {
    const data = JSON.parse(await AsyncStorage.getItem("userData"));
    console.log(data)
    if (data) {
      setProfileData({
        ...profileData,
        firstName: data.name,
        email: data.email,
        phone: data.phone,
      });
    }
  };
  async function _handleSubmit(params) {
    try {
      setIsLoading(true);
      if(profileData.phone.length==10)
      {
        const params = {
            name: profileData.firstName,
            emp_code: userData.emp_code,
            branch_id: userData.branch_id,
            phone: profileData.phone,
          };
          const { data } = await apiCall(
            "POST",
            apiEndPoints.PROFILE_UPDATE,
            params
          )
          if (data.status === 200) {
            setIsLoading(false);
            setUserData(data.data);
            await AsyncStorage.setItem("userData", JSON.stringify(data.data));
            alert(data.message);
          } else {
            setIsLoading(false);
            alert(data.message);
          }
      }else{
          setIsLoading(false)
          alert("Please enter proper number")
      }
      
    } catch (error) {
      setIsLoading(false);
      alert(JSON.stringify(error));
    }
  }
  console.log("PD: ",profileData)
  return (
    <>
      {isLoading && <Loader />}
      <Profile
        profileData={profileData}
        setProfileData={setProfileData}
        _handleSubmit={_handleSubmit}
      />
    </>
  );
}
