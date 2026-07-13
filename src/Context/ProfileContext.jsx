import React, { createContext, useState } from 'react'
import { getStoredJson, setStoredJson, USER_STORAGE_KEY } from '../utils/storage.utils'

export const ProfileContext = createContext()

export const ProfileContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        return getStoredJson(USER_STORAGE_KEY)
    })

    const updateUser = (userData) => {
        setUser(userData)
        setStoredJson(USER_STORAGE_KEY, userData)
    }

    return (
        <ProfileContext.Provider value={{ user, setUser: updateUser }}>
            {children}
        </ProfileContext.Provider>
    )
}
