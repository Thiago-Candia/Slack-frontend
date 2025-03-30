import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "./ProfileContext";
import { useApiRequest } from "../hooks/useApiRequest";
import ENVIROMENT from "../config/enviroment";

export const DirectMessageContext = createContext();

const DirectMessageProvider = ({ children }) => {

    const { user_id } = useParams()
    const { user } = useContext(ProfileContext)
    const [messages, setMessages] = useState([])

    const { responseApiState, getRequest, postRequest } = useApiRequest(ENVIROMENT.URL_API + `/workspace/dm/${user_id}`)

    useEffect(() => {
        if (!user_id) return
        const fetchMessages = async () => {
            await getRequest(`/${user_id}`)
        }

        fetchMessages()
    }, [user_id])

    useEffect(() => {
        if (responseApiState.data?.messages) {
            setMessages(responseApiState.data.messages)
        }
    }, [responseApiState.data])

    const sendDirectMessage = async (content) => {
        if (!user_id || !content) return;
        await postRequest(`/${user_id}`, { content });
        setMessages((prev) => [...prev, { sender: user._id, receiver: user_id, content }]);
    };

    return (
        <DirectMessageContext.Provider value={{ messages, sendDirectMessage }}>
            {children}
        </DirectMessageContext.Provider>
    )
}

export default DirectMessageProvider
