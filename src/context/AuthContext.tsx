import React from "react";

interface Props_ {
  children: React.ReactNode;
}

type State = "INITIALIZING" | "LOGGEDIN" | "LOGGEDOUT";

export interface AuthContext_ {
  authState: State;
  setAuthState: (data: State) => void;
}

export const AuthContext = React.createContext<AuthContext_>({
  authState: "INITIALIZING",
  setAuthState: () => undefined,
});

export const AuthContextProvider: React.FC<Props_> = ({ children }) => {
  const [authState, setAuthState] = React.useState<State>("INITIALIZING");

  const AuthContextValues: AuthContext_ = {
    authState,
    setAuthState: setAuthState,
  };

  return (
    <AuthContext.Provider value={AuthContextValues}>
      {children}
    </AuthContext.Provider>
  );
};
