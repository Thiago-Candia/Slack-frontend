import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { WorkspaceContext } from '../Context/WorkspaceContext'
import slackLogo from '../Assets/svg/slack-new-logo.svg'

const getWorkspaceName = (workspace) => workspace.name?.trim() || 'Workspace sin nombre'

const getMembersCount = (workspace) => Array.isArray(workspace.members) ? workspace.members.length : 0

const WorkspaceList = () => {
    const { user, workspaces, loading, error } = useContext(WorkspaceContext)
    const workspaceItems = Array.isArray(workspaces) ? workspaces.filter((workspace) => workspace?._id) : []

    return (
        <section className="workspace-panel" aria-labelledby="workspace-panel-title">
            <p className="workspace-panel__greeting">Hola de nuevo!</p>
            <div className="workspace-panel__card">
                <header className="workspace-panel__header">
                    <h1 id="workspace-panel-title" className="workspace-panel__title">
                        {user?.email
                            ? `Espacios de trabajo para ${user.email}`
                            : 'Tus espacios de trabajo'}
                    </h1>
                </header>

                {loading && <p className="workspace-panel__status">Cargando espacios de trabajo...</p>}
                {!loading && error && (
                    <p className="workspace-panel__status workspace-panel__status--error">{error}</p>
                )}
                {!loading && !error && workspaceItems.length === 0 && (
                    <p className="workspace-panel__status">No perteneces a ning&uacute;n workspace a&uacute;n.</p>
                )}

                {!loading && !error && workspaceItems.length > 0 && (
                    <ul className="workspace-panel__list">
                        {workspaceItems.map((workspace) => {
                            const membersCount = getMembersCount(workspace)
                            const workspaceName = getWorkspaceName(workspace)

                            return (
                                <li key={workspace._id} className="workspace-panel__item">
                                    <article className="workspace-item">
                                        <div className="workspace-item__details">
                                            <img
                                                src={workspace.image || slackLogo}
                                                className="workspace-item__logo"
                                                alt=""
                                                loading="lazy"
                                                decoding="async"
                                                onError={(event) => {
                                                    event.currentTarget.src = slackLogo
                                                }}
                                            />
                                            <div className="workspace-item__content">
                                                <h2 className="workspace-item__name" title={workspaceName}>
                                                    {workspaceName}
                                                </h2>
                                                <p className="workspace-item__members">
                                                    {membersCount} {membersCount === 1 ? 'miembro' : 'miembros'}
                                                </p>
                                            </div>
                                        </div>
                                        <Link to={`/workspace/${workspace._id}`} className="workspace-item__button">
                                            Iniciar Slack
                                        </Link>
                                    </article>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </section>
    )
}

export default WorkspaceList
