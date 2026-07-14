import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import "../Styles/styles.css"
import { WorkspaceContext } from "../Context/WorkspaceContext.jsx"
import WorkspacePrimarySidebar from "./WorkspacePrimarySidebar.jsx"
import WorkspaceSidebar from "./WorkspaceSidebar.jsx"
import WorkspaceConversation from "./WorkspaceConversation.jsx"

const WorkspaceChat = ({ isSidebarOpen, onCloseSidebar }) => {
    const { workspace_id } = useParams()
    const { workspaces, loading, error } = useContext(WorkspaceContext)
    const currentWorkspace = workspaces.find((workspace) => workspace._id === workspace_id)

    return (
        <>
            <WorkspacePrimarySidebar/>
            <WorkspaceSidebar
                workspace={currentWorkspace}
                loading={loading}
                error={error}
                isMobileOpen={isSidebarOpen}
                onMobileClose={onCloseSidebar}
            />
            <WorkspaceConversation workspace={currentWorkspace} loading={loading} error={error}/>
        </>
    )
}

export default WorkspaceChat
