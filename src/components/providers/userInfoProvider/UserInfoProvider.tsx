import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher, get } from '../../../services/axios';
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

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <userInfoContext.Provider value={userInfo ?userInfo : []}>
      {children}
    </userInfoContext.Provider>
  );
};

export default UserInfoProvider;