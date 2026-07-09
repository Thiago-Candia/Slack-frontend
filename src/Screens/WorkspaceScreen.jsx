import React from "react"
import WorkspaceChat from "../Components/WorkspaceChat.jsx"
import WorkspaceChatHeader from "../Components/WorkspaceChatHeader.jsx"
import "../Styles/styles.css"

const WorkspaceScreen = () => {

    return (
        <section className="workspace-container">
            <div className="workspace-header">
                <WorkspaceChatHeader/>
            </div>
            <div className="workspace-chat">
                <WorkspaceChat/>
            </div>
        </section>
    )
}

export default WorkspaceScreen
