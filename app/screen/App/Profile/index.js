import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../utils/UserContext";
import Profile from "./component/Profile";
import { apiCall } from "../../../utils/httpClient";
import apiEndPoints from "../../../utils/apiEndPoints";
import Loader from "../../../utils/Loader";
import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function Index({navigation}) {
  // const navigation = useNavigation();
  const [userData, setUserData] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    email: "",
    phone: "",
  });
  // useEffect(() => {
  //   userDetail()
  // }, [navigation]);
  const userDetail = async () => {
    const data = JSON.parse(await AsyncStorage.getItem("userData"));
    if (data) {
      setProfileData({
        ...profileData,
        firstName: data.name,
        email: data.email,
        phone: data.phone,
      });
    }
    setIsLoading(false);
  };
  const validationForm = () => {
    if(profileData.firstName === '')
    {
      Alert.alert("Please enter name ");
      return false;
    }else if (profileData.phone === '')
    {
      Alert.alert("Please fill phone number");
      return false;
    }
    else if(profileData.phone.length !==10)
    {
      Alert.alert("Please enter proper number");
      return false;
    } 
    return true;
  }
  async function _handleSubmit(params) {
    try {
      setIsLoading(true);
      const valid = validationForm();
      if(valid)
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
          setIsLoading(false);
      }
      
    } catch (error) {
      setIsLoading(false);
      alert(JSON.stringify(error));
    }
  }
  useFocusEffect(React.useCallback(()=>{
    setIsLoading(true);
       userDetail();
  },[]))
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
