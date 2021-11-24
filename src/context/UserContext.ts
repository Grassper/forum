import React from "react";

export interface UserContext_ {
  id: string;
  username: string;
  email: string;
  profileImageUrl: string;
  about: string;
  coins: number;
}

export const UserContext = React.createContext<UserContext_>({
  id: "",
  username: "",
  email: "",
  about: "",
  profileImageUrl: "",
  coins: 0,
});
