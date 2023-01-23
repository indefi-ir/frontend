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

  const access_token = typeof window !== "undefined" && localStorage.getItem('token')

  useEffect(() => {
    getUserInfo();
  }, [access_token]);
  
  return (
    <userInfoContext.Provider value={userInfo ?userInfo : []}>
      {children}
    </userInfoContext.Provider>
  );
};

export default UserInfoProvider;