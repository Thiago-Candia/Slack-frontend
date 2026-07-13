import React, { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import { workspaceService } from "../services";

export const InviteUserContext = createContext()

export const InviteUserContextProvider = ({children}) => {

    const [isInviting, setIsInviting] = useState(false)
    const [isJoining, setIsJoining] = useState(false)
    const [error, setError] = useState(null)
    const { workspace_id } = useParams()
    const { execute: generateInviteRequest } = useApiRequest(workspaceService.generateInvite, { throwOnError: true })
    const { execute: joinWorkspaceRequest } = useApiRequest(workspaceService.join, { throwOnError: true })


    const inviteUser = async () => {
        setIsInviting(true)
        setError(null)
        try {
            const response = await generateInviteRequest(workspace_id)
            if(response?.payload?.invite_link){
                return { invite_link : response.payload.invite_link }
            }
        }
        catch (error){
            setError(error.message)
        }
        finally {
            setIsInviting(false)
        }
    }

    const joinWorkspace = async (inviteToken) => {
        setIsJoining(true)
        setError(null)
        try {
            await joinWorkspaceRequest(inviteToken)
        }
        catch (error){
            setError(error.message)
        }
        finally {
            setIsJoining(false)
        }
    }

    return(
        <InviteUserContext.Provider value={{ inviteUser, isInviting, error, isJoining, joinWorkspace }}>
            {children}
        </InviteUserContext.Provider>
    )
}
