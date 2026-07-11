import React from "react"
import WorkspaceChat from "../Components/WorkspaceChat.jsx"
import WorkspaceChatHeader from "../Components/WorkspaceChatHeader.jsx"
import "../Styles/styles.css"

const WorkspaceScreen = () => {
    return (
        <section className="workspace-layout">
            <div className="workspace-layout__topbar">
                <WorkspaceChatHeader/>
            </div>
            <div className="workspace-layout__body">
                <WorkspaceChat/>
            </div>
        </section>
    )
}

export default WorkspaceScreen
