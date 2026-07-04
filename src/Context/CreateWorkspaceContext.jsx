import React, { createContext, useContext, useState } from "react";
import { WorkspaceContext } from "./WorkspaceContext";
import { useApiRequest } from "../hooks/useApiRequest";
import { workspaceService } from "../services/workspace.service";

export const CreateWorkspaceContext = createContext();

export const CreateWorkspaceContextProvider = ({ children }) => {

    const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
    const [error, setError] = useState(null)
    const { setWorkspaces } = useContext(WorkspaceContext)
    const { execute: createWorkspaceRequest } = useApiRequest(workspaceService.create, { throwOnError: true })

    const createWorkspace = async (workspace_name) => {
        setIsCreatingWorkspace(true)
        setError(null)

        try {
            const response = await createWorkspaceRequest(workspace_name)

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
