import React from "react"
import ChannelContextProvider from "../Context/ChannelContext"
import { MessageSendContextProvider } from "../Context/MessageSendContext"
import WorkspaceScreen from "../Screens/WorkspaceScreen"
import { CreateChannelContextProvider } from "../Context/CreateChannelContext"
import { InviteUserContextProvider } from "../Context/InviteUserContext"
import { ProfileContextProvider } from "../Context/ProfileContext"
import UpdateProfileContextProvider from "../Context/UpdateProfileContext"

const WorkspaceWrapper = () => {
    return (
    <ChannelContextProvider>
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
    </ChannelContextProvider>
    )
}

export default WorkspaceWrapper







