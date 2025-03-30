import { createContext, useEffect, useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import ENVIROMENT from "../config/enviroment";


export const ProfileContext = createContext()

export const ProfileContextProvider = ({children}) => {

    const [user, setUser] = useState()
    const {responseApiState, getRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/profile')

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("authorization_token")
            await getRequest({
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
        }
        fetchProfile()
    }, [])

    useEffect(() => {
        if(responseApiState.data && responseApiState.data.payload){
            setUser(responseApiState.data.payload.user)
        }
    })


    return (
        <ProfileContext.Provider value={{user, setUser}}>  
            {children}
        </ProfileContext.Provider>
    )

}