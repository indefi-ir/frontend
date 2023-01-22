import React, { useEffect, useState } from 'react';
import { fetcher } from '../../../services/axios';
import { userInfoUrl } from '../../../services/apiEndpoint';

export const userInfoContext = React.createContext([]);

interface Props {
  children?: any;
}

const UserInfoProvider = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState()
  const getUserInfo = async () => {
    const response = await fetcher(`${userInfoUrl}`);
    if (response) {
      setUserInfo(response)
    }
  };

  if(typeof window !== "undefined") {
    useEffect(() => {
      getUserInfo();
    }, [localStorage.getItem("token")]);
  }
  
  return (
    <userInfoContext.Provider value={userInfo ?userInfo : []}>
      {children}
    </userInfoContext.Provider>
  );
};

export default UserInfoProvider;