import React, { createContext, useState } from 'react'

export const ProfileContext = createContext()

export const ProfileContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user')
        return savedUser ? JSON.parse(savedUser) : null
    })

    const updateUser = (userData) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    return (
        <ProfileContext.Provider value={{ user, setUser: updateUser }}>
            {children}
        </ProfileContext.Provider>
    )
}
