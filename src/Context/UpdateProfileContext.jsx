import React,{ createContext, useEffect, useState } from "react"
import { useApiRequest } from "../hooks/useApiRequest"
import { profileService } from "../services/profile.service"

export const UpdateProfileContext = createContext();

const UpdateProfileContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const { responseApiState, execute: updateProfileRequest } = useApiRequest(profileService.update, { throwOnError: true })

    const updateProfile = async (body) => {
        return updateProfileRequest(body)
    }

    useEffect(() => {
        if (responseApiState.data?.payload?.user) {
            setUser(responseApiState.data.payload.user)
        }
    }, [responseApiState.data])

    return (
        <UpdateProfileContext.Provider value={{ user, updateProfile }}>
            {children}
        </UpdateProfileContext.Provider>
    )
}

export default UpdateProfileContextProvider
