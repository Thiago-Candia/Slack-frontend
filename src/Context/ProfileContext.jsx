import React, { createContext, useState, useEffect } from 'react';

export const ProfileContext = createContext()

export const ProfileContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Cargar usuario desde localStorage si existe
        const savedUser = localStorage.getItem('user')
        return savedUser ? JSON.parse(savedUser) : null
    })

    // Función para actualizar el usuario de forma consistente
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