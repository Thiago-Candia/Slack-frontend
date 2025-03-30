import { createContext, useContext, useState } from "react";
import { WorkspaceContext } from "./WorkspaceContext";
import { useApiRequest } from "../hooks/useApiRequest";
import ENVIROMENT from "../config/enviroment";

export const CreateWorkspaceContext = createContext();

export const CreateWorkspaceContextProvider = ({ children }) => {

    const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);

    const [error, setError] = useState(null)

    const { setWorkspaces } = useContext(WorkspaceContext)

    const { postRequest } = useApiRequest(`${ENVIROMENT.URL_API}/api/workspaces`)

    const createWorkspace = async (workspace_name) => {
        setIsCreatingWorkspace(true)
        setError(null)

        try {
            const token = localStorage.getItem("authorization_token");
            if (!token) {
                throw new Error("No hay token disponible");
            }

            const response = await postRequest(
                { name: workspace_name }, token)

            if (response?.payload?.new_workspace) {
                setWorkspaces((prevState) => [...prevState, response.payload.new_workspace]);
            }
        } 
        catch (error) {
            setError(error.message)
        } 
        finally {
            setIsCreatingWorkspace(false)
        }
    }

    return (
        <CreateWorkspaceContext.Provider value={{ createWorkspace, isCreatingWorkspace, error }}>
            {children}
        </CreateWorkspaceContext.Provider>
    )
}
