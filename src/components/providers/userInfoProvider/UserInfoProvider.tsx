import React, { useEffect, useState } from 'react';

export const userInfoContext = React.createContext([]);

interface Props {
  children?: any;
}

const UserInfoProvider = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState<string | null | any>(null)

  const access_token = typeof window !== "undefined" && localStorage.getItem('token')

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserInfo(role)
  }, [access_token]);

  return (
    <userInfoContext.Provider value={userInfo ? userInfo : []}>
      {children}
    </userInfoContext.Provider>
  );
};

export default UserInfoProvider;