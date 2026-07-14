import React, { createContext, useEffect, useState, useCallback } from "react"
import { useApiRequest } from "../hooks/useApiRequest"
import { AUTH_TOKEN_KEY, profileService, workspaceService } from "../services"
import { clearSessionCache, getStoredJson, setStoredJson, USER_STORAGE_KEY } from "../utils/storage.utils"

export const WorkspaceContext = createContext()

const WorkspaceContextProvider = ({ children }) => {

    const [workspaces, setWorkspaces] = useState([])
    const [user, setUser] = useState(() => getStoredJson(USER_STORAGE_KEY))
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { responseApiState, execute: getWorkspaces } = useApiRequest(workspaceService.getAll)
    const { execute: updateProfileRequest } = useApiRequest(profileService.update, { throwOnError: true })

    const loadWorkspaces = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            await getWorkspaces()
        } 
        catch (error) {
            setError(error.message || "Error al cargar workspaces")
        } 
        finally {
            setLoading(false)
        }
    }, [getWorkspaces])


    useEffect(() => {
        loadWorkspaces()
    }, [loadWorkspaces])


    useEffect(() => {
        
        if (responseApiState?.data?.payload) {
            const { workspaces: apiWorkspaces, user: apiUser } = responseApiState.data.payload;
            
            if (Array.isArray(apiWorkspaces)) {
                setWorkspaces(prev => 
                    JSON.stringify(prev) !== JSON.stringify(apiWorkspaces) ? apiWorkspaces : prev
                );
            }

            if (apiUser) {
                setUser(apiUser)
                setStoredJson(USER_STORAGE_KEY, apiUser)
            }
        }
        if (responseApiState?.error) {
            setError(responseApiState.error.message || "Error al cargar workspaces")
        }
    }, [responseApiState.data, responseApiState.error])

    const updateProfile = useCallback(async (profileData) => {
        const response = await updateProfileRequest(profileData)
        const updatedUser = response?.payload?.user

        if (updatedUser) {
            setUser(updatedUser)
            setStoredJson(USER_STORAGE_KEY, updatedUser)
        }

        return response
    }, [updateProfileRequest])

    const logout = useCallback(() => {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        clearSessionCache()
        setUser(null)
        setWorkspaces([])
    }, [])

    return (
        <WorkspaceContext.Provider value={{ 
            workspaces, 
            user, 
            loading, 
            error, 
            loadWorkspaces, 
            logout,
            setWorkspaces,
            updateProfile
        }}>
            {children}
        </WorkspaceContext.Provider>
    )
}

export default WorkspaceContextProvider
