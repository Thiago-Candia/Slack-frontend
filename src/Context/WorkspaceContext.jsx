import React, { createContext, useEffect, useState, useCallback } from "react"
import { useApiRequest } from "../hooks/useApiRequest"
import { workspaceService } from "../services/workspace.service"
import { AUTH_TOKEN_KEY } from "../services/httpClient"

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
            console.log("Error loading workspaces:", error)
        } 
        finally {
            setLoading(false)
        }
    }, [getWorkspaces])


    useEffect(() => {
        loadWorkspaces()
    }, [])


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
    }, [responseApiState])

    const logout = useCallback(() => {
        localStorage.removeItem(AUTH_TOKEN_KEY)
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
