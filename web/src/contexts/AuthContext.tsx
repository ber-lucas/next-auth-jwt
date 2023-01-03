import Router from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from "react";
import { signInRequest } from "../services/auth";

type SignInDataType = {
  email: string,
  password: string,
}

type User = {
  name: string,
  email: string,
  avatar_url: string,
}

type AuthContextType = {
  isAuthenticated: boolean,
  user?: User,
  signIn: (data: SignInDataType) => Promise<void>,
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | undefined>(undefined)

  const isAuthenticated = !!user;

  const signIn = async ({ email, password }: SignInDataType) => {
    const { token, user } = await signInRequest({
      email,
      password,   
    })
    
    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 1 //1 hour
    })

    setUser(user);

    Router.push('/dashboard')
  }

  console.log(parseCookies(undefined, ))

  useEffect(() => {
    
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}