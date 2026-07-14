import React, { useState } from "react"
import WorkspaceChat from "../Components/WorkspaceChat.jsx"
import WorkspaceChatHeader from "../Components/WorkspaceChatHeader.jsx"
import "../Styles/styles.css"

const WorkspaceScreen = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <section className="workspace-layout">
            <div className="workspace-layout__topbar">
                <WorkspaceChatHeader
                    isSidebarOpen={isSidebarOpen}
                    onToggleSidebar={() => setIsSidebarOpen((isOpen) => !isOpen)}
                />
            </div>
            <div className="workspace-layout__body">
                <WorkspaceChat
                    isSidebarOpen={isSidebarOpen}
                    onCloseSidebar={() => setIsSidebarOpen(false)}
                />
                {isSidebarOpen && (
                    <button
                        type="button"
                        className="workspace-layout__sidebar-backdrop"
                        aria-label="Cerrar navegacion del workspace"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </div>
        </section>
    )
}

export default WorkspaceScreen
