import { createContext, useEffect, useState, useCallback } from "react";
import ENVIROMENT from "../config/enviroment";
import { useApiRequest } from "../hooks/useApiRequest";

export const WorkspaceContext = createContext();

const WorkspaceContextProvider = ({ children }) => {

    const [workspaces, setWorkspaces] = useState([])
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    const { responseApiState, getRequest } = useApiRequest(ENVIROMENT.URL_API + "/api/workspaces");

    const loadWorkspaces = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const token = localStorage.getItem("authorization_token");
            await getRequest({
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (!token) {
                throw new Error("No hay token disponible");
            }
        } 
        catch (error) {
            console.log("Error loading workspaces:", error);
        } 
        finally {
            setLoading(false);
        }
    }, [getRequest])


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
            setError(responseApiState.error.message || "Error al cargar workspaces");
        }
    }, [responseApiState])

    const logout = useCallback(() => {
        localStorage.removeItem('authorization_token');
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
            logout 
        }}>
            {children}
        </WorkspaceContext.Provider>
    )
}

export default WorkspaceContextProvider