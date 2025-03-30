import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import ENVIROMENT from "../config/enviroment";

export const InviteUserContext = createContext()

export const InviteUserContextProvider = ({children}) => {

    const [isInviting, setIsInviting] = useState(false)

    const [isJoining, setIsJoining] = useState(false)

    const [error, setError] = useState(null)

    const { workspace_id } = useParams()

    const { postRequest } = useApiRequest(`${ENVIROMENT.URL_API}/api/workspaces/${workspace_id}/generate-invite`)

    const { postRequest: joinRequest } = useApiRequest(`${ENVIROMENT.URL_API}/api/workspaces/join`)


    const inviteUser = async () => {
        setIsInviting(true)
        setError(null)
        try {
            const token = localStorage.getItem("authorization_token");
            if (!token) {
                throw new Error("No hay token disponible");
            }
            const response = await postRequest({}, token)
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
            const token = localStorage.getItem("authorization_token");
            if (!token) {
                throw new Error("No hay token disponible")
            }
            await joinRequest({}, token, `/${inviteToken}` )
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