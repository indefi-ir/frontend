// @ts-ignore
import React, { useEffect, useState } from 'react';

export const UserInfoContext = React.createContext({
  userInfo: {
    role: "",
    id: ""
  },
  setUserInfo: (info: any) => { }
});


export default UserInfoContext;