import React, { createContext, useEffect, useState, useCallback } from "react"
import { useApiRequest } from "../hooks/useApiRequest"
import { AUTH_TOKEN_KEY, workspaceService } from "../services"
import { clearSessionCache } from "../utils/storage.utils"

export const WorkspaceContext = createContext()

const WorkspaceContextProvider = ({ children }) => {

    const [workspaces, setWorkspaces] = useState([])
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { responseApiState, execute: getWorkspaces } = useApiRequest(workspaceService.getAll)

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
                setUser(prev => 
                    JSON.stringify(prev) !== JSON.stringify(apiUser) ? apiUser : prev
                );
            }
        }
        if (responseApiState?.error) {
            setError(responseApiState.error.message || "Error al cargar workspaces")
        }
    }, [responseApiState.data, responseApiState.error])

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
            setWorkspaces
        }}>
            {children}
        </WorkspaceContext.Provider>
    )
}

export default WorkspaceContextProvider
