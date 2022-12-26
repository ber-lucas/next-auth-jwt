import { setCookie } from 'nookies';
import { createContext } from "react";
import { signInRequest } from "../services/auth";

type SignInDataType = {
  email: string,
  password: string,
}

type AuthContextType = {
  isAuthenticated: boolean,
  signIn: (data: SignInDataType) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const isAuthenticated = false;

  const signIn = async ({ email, password }: SignInDataType) => {
    const { token, user } = await signInRequest({ email, password })
    
    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 1 //1 hour
    })
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}