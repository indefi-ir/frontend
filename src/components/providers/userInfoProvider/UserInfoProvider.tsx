// @ts-ignore
import React, { useEffect, useState } from 'react';

export const UserInfoContext = React.createContext({
  userInfo: null,
  setUserInfo: (info: any) => { }
});


export default UserInfoContext;