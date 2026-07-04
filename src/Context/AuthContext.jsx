import React, { createContext, useEffect, useState } from "react";
import { AUTH_TOKEN_KEY } from "../services/httpClient";

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {

    let isAuthenticatedInitialState = Boolean(localStorage.getItem(AUTH_TOKEN_KEY))

    const [isAuthenticatedState, setIsAuthenticatedState] = useState(isAuthenticatedInitialState)

    useEffect(
        () => {
            const token = localStorage.getItem(AUTH_TOKEN_KEY)
            if(token){
                setIsAuthenticatedState(true)
            }
        },
        []
    )

    const logout = () => {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        setIsAuthenticatedState(false)
    }

    const login = (authorization_token) => {
        localStorage.setItem(AUTH_TOKEN_KEY, authorization_token)
        setIsAuthenticatedState(true)
    }

    return (
        <AuthContext.Provider value={{isAuthenticatedState, logout, login}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider
