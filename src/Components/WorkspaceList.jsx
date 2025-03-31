import React, { useContext } from 'react'
import { WorkspaceContext } from '../Context/WorkspaceContext'

const WorkspaceList = () => {

    const { user, workspaces } = useContext(WorkspaceContext)

    return (
        <div className="workspace-list-container">
            <span className='workspace-list-container-title'>
                👋 ¡Hola de nuevo! 
            </span>
            <div className="workspace-list">
                <div className='workspace-list-card-title'>
                    {user?.email && (
                    <span>
                        Espacios de trabajo para {user.email}
                    </span>
                    )} 
                </div>
                    {workspaces && workspaces.length > 0 ? (
                        workspaces.map((workspace) => (
                            <div key={workspace._id} className="workspace-card">
                                <div className="workspace-info workspace-card-item">
                                    <img src={workspace.image || "/default-logo.png"} className="workspace-logo"/>
                                    <div>
                                        <h3>{workspace.name}</h3>
                                        <p>{workspace.members.length} miembros </p>
                                    </div>
                                </div>
                                <div className="workspace-card-item">
                                    <a href={`/workspace/${workspace._id}`} className="btn-start">
                                        INICIAR SLACK
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No perteneces a ningún workspace aún.</p>
                    )}
            </div>
        </div>
    )
}

export default WorkspaceList