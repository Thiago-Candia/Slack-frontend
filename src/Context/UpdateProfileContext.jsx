import React,{ createContext, useEffect, useState } from "react"
import { useApiRequest } from "../hooks/useApiRequest"
import ENVIROMENT from "../config/enviroment"

export const UpdateProfileContext = createContext();

const UpdateProfileContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const { responseApiState, putRequest } = useApiRequest(ENVIROMENT.URL_API + "/api/profile")

    const updateProfile = async (body) => {
        const token = localStorage.getItem("authorization_token")
        try{
            const response = await putRequest({
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
            })
            return response;
        }
        catch(error){
            console.error("Error al actualizar el perfil:", error)
        }
    }

    useEffect(() => {
        if (responseApiState.data && responseApiState.data.payload?.user) {
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
