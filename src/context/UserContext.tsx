import React from "react";

interface Props_ {
  children: React.ReactNode;
}

interface User_ {
  id: string;
  username: string;
  email: string;
  profileImageUrl: string;
  about: string;
  coins: number;
  _version: number;
}

export interface UserContext_ {
  user: User_;
  updateUser: (data: User_) => void;
}

export const UserContext = React.createContext<UserContext_>({
  user: {
    id: "",
    username: "",
    email: "",
    about: "",
    profileImageUrl: "",
    coins: 0,
    _version: 0,
  },
  updateUser: () => undefined,
});

export const UserContextProvider: React.FC<Props_> = ({ children }) => {
  const [user, setUser] = React.useState<User_>({
    id: "",
    username: "",
    email: "",
    about: "",
    profileImageUrl: "",
    coins: 0,
    _version: 0,
  });

  const UserContextValues: UserContext_ = {
    user,
    updateUser: setUser,
  };

  return (
    <UserContext.Provider value={UserContextValues}>
      {children}
    </UserContext.Provider>
  );
};
