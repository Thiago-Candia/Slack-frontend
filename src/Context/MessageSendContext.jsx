import { createContext, useContext, useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import ENVIROMENT from "../config/enviroment";
import { useParams } from "react-router-dom";

export const MessageSendContext = createContext();

export const MessageSendContextProvider = ({ children }) => {

    const { channel_id } = useParams()
    const [isSending, setIsSending] = useState(false)
    const [error, setError] = useState(null)
    const { postRequest } = useApiRequest(`${ENVIROMENT.URL_API}/api/channels/${channel_id}/messages`)

const sendMessage = async (new_message) => {
        setIsSending(true)
        setError(null)
        console.log("Enviando mensaje:", channel_id)
        if(!channel_id) {
            console.log("No se proporcionó un channel_id válido.")
            return
        }
        try {
            const token = localStorage.getItem("authorization_token")
            console.log("Token obtenido:", token)
            if (!token) {
                throw new Error("No hay token disponible")
            }
            const response = await postRequest({ content: new_message }, token)
            if (response?.payload?.new_message) {
                return response.payload.new_message
            }
        } 
        catch (error) {
            console.error("Error enviando mensaje:", error)
            setError(error.message)
        } 
        finally {
            setIsSending(false)
        }
    }

    return (
        <MessageSendContext.Provider value={{ sendMessage, isSending, error }}>
            {children}
        </MessageSendContext.Provider>
    )
}

export const useSendMessage = () => {
    return useContext(MessageSendContext)
}



