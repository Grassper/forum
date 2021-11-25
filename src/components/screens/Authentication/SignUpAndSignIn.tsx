import React from "react";

import { useToggle } from "@/root/src/hooks";

import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

interface Props_ {}
export const SignUpAndSignIn: React.FC<Props_> = () => {
  const [Login, setLogin] = useToggle(false);

  return Login ? (
    <SignIn Login={Login} setLogin={setLogin} />
  ) : (
    <SignUp Login={Login} setLogin={setLogin} />
  );
};
