import React from "react";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import UserStack from "./UserStack";
import AuthStack from "./AuthStack";

export default function RootNavigation() {
  const { user } = useAuthentication();

  return user ? <UserStack /> : <AuthStack />;
}
