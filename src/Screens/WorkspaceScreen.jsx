import React from "react";
import WorkspaceChat from "../Components/WorkspaceChat.jsx";
import WorksapceChatHeader from "../Components/WorksapceChatHeader.jsx";
import "../Styles/styles.css";

const WorkspaceScreen = () => {

    return (
        <section className="workspace-container">
            <div className="workspace-header">
                <WorksapceChatHeader/>
            </div>
            <div className="workspace-chat">
                <WorkspaceChat/>
            </div>
        </section>
    )
}

export default WorkspaceScreen
