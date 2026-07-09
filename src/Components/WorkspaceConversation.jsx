import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import MessageContextProvider from "../Context/MessageContext"
import DirectMessageProvider from "../Context/DirectMessageContext"
import { ChannelContext } from "../Context/ChannelContext"
import MessageList from "./MessageList"
import NewMessage from "./NewMessage"

const ConversationLayout = ({ title, subtitle, children }) => {
    return (
        <section className="workspace-conversation" aria-label={title}>
            <header className="conversation-header">
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
            </header>
            {children}
        </section>
    )
}

const WorkspaceEmptyState = ({ workspaceName, loading, error }) => {
    const title = loading ? "Cargando workspace..." : "Selecciona una conversación"
    const description = error
        ? "No pudimos cargar este workspace. Revisa tu conexión o vuelve a intentarlo."
        : `Elige un canal o un mensaje directo${workspaceName ? ` en ${workspaceName}` : ""} para empezar.`

    return (
        <section className="workspace-conversation workspace-conversation--empty" aria-label={title}>
            <div className="conversation-empty-state">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </section>
    )
}

const WorkspaceConversation = ({ workspace, loading, error }) => {
    const { channel_id, user_id } = useParams()
    const { channels, loading: channelsLoading } = useContext(ChannelContext)
    const activeChannel = channels.find((channel) => channel._id === channel_id)
    const members = Array.isArray(workspace?.members) ? workspace.members : []
    const activeMember = members.find((member) => member._id === user_id)

    if (user_id) {
        return (
            <DirectMessageProvider>
                <ConversationLayout
                    title={activeMember?.username || "Mensaje directo"}
                    subtitle={activeMember?.email || "Conversación privada"}
                >
                    <MessageList/>
                    <NewMessage/>
                </ConversationLayout>
            </DirectMessageProvider>
        )
    }

    if (channel_id) {
        const title = activeChannel?.name ? `# ${activeChannel.name}` : channelsLoading ? "Cargando canal..." : "# Canal"

        return (
            <MessageContextProvider>
                <ConversationLayout title={title} subtitle="Canal del workspace">
                    <MessageList/>
                    <NewMessage/>
                </ConversationLayout>
            </MessageContextProvider>
        )
    }

    return (
        <WorkspaceEmptyState
            workspaceName={workspace?.name}
            loading={loading}
            error={error}
        />
    )
}

export default WorkspaceConversation
