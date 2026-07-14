import React from "react"
import ChannelContextProvider from "../Context/ChannelContext"
import { MessageSendContextProvider } from "../Context/MessageSendContext"
import WorkspaceScreen from "../Screens/WorkspaceScreen"
import { CreateChannelContextProvider } from "../Context/CreateChannelContext"
import { InviteUserContextProvider } from "../Context/InviteUserContext"

const WorkspaceWrapper = () => {
    return (
    <ChannelContextProvider>
        <MessageSendContextProvider>
            <CreateChannelContextProvider>
                <InviteUserContextProvider>
                    <WorkspaceScreen />
                </InviteUserContextProvider>
            </CreateChannelContextProvider>
        </MessageSendContextProvider>
    </ChannelContextProvider>
    )
}

export default WorkspaceWrapper







