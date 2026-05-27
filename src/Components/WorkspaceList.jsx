import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { WorkspaceContext } from '../Context/WorkspaceContext'
import slackLogo from '../Assets/svg/slack-new-logo.svg'

const WorkspaceList = () => {
    const { user, workspaces, loading, error } = useContext(WorkspaceContext)

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
                {!loading && !error && workspaces.length === 0 && (
                    <p className="workspace-panel__status">No perteneces a ning&uacute;n workspace a&uacute;n.</p>
                )}

                {!loading && !error && workspaces.length > 0 && (
                    <ul className="workspace-panel__list">
                        {workspaces.map((workspace) => (
                            <li key={workspace._id} className="workspace-panel__item">
                                <article className="workspace-item">
                                    <div className="workspace-item__details">
                                        <img
                                            src={workspace.image || slackLogo}
                                            className="workspace-item__logo"
                                            alt=""
                                        />
                                        <div>
                                            <h2 className="workspace-item__name">{workspace.name}</h2>
                                            <p className="workspace-item__members">
                                                {workspace.members.length} miembros
                                            </p>
                                        </div>
                                    </div>
                                    <Link to={`/workspace/${workspace._id}`} className="workspace-item__button">
                                        Iniciar Slack
                                    </Link>
                                </article>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}

export default WorkspaceList
