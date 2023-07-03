import React, { createContext, useState } from "react";

interface ChildrenProps {
  children: React.ReactNode;
}

export const UserContext = createContext({});

export const UserContextProvider = ({ children }: ChildrenProps) => {
  const [userInfo, setUserInfo] = useState({});

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
