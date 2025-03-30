import React from "react"
import ChannelContextProvider from "../Context/ChannelContext"
import MessageContextProvider from "../Context/MessageContext"
import { MessageSendContextProvider } from "../Context/MessageSendContext"
import WorkspaceScreen from "../Screens/WorkspaceScreen"
import { CreateChannelContextProvider } from "../Context/CreateChannelContext"
import { InviteUserContextProvider } from "../Context/InviteUserContext"
import { ProfileContextProvider } from "../Context/ProfileContext"
import UpdateProfileContextProvider from "../Context/UpdateProfileContext"

/* COMPONENTE PARA APP. PRINCIPIO DRY */

const WorkspaceWrapper = () => {
    return (
    <ChannelContextProvider>
        <MessageContextProvider>
            <MessageSendContextProvider>
                <CreateChannelContextProvider>
                    <InviteUserContextProvider>
                        <ProfileContextProvider>
                            <UpdateProfileContextProvider>
                                <WorkspaceScreen />
                            </UpdateProfileContextProvider>
                        </ProfileContextProvider>
                    </InviteUserContextProvider>
                </CreateChannelContextProvider>
            </MessageSendContextProvider>
        </MessageContextProvider>
    </ChannelContextProvider>
    )
}

export default WorkspaceWrapper







