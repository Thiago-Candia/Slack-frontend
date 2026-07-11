import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { WorkspaceContext } from '../Context/WorkspaceContext'
import '../Styles/styles.css'
import { Icons } from '../Assets/Icons/Icons'
import useModal from '../hooks/useModal'
import ModalInviteUser from './ModalInviteUser'
import { DEFAULT_AVATAR_URL } from '../constants/workspace.constants'

const UserList = () => {
    const { workspaces, loading, error } = useContext(WorkspaceContext)
    const { isOpen: isInviteOpen, openModal: openInviteModal, closeModal: closeInviteModal } = useModal()
    const { workspace_id, user_id } = useParams()
    const workspace = workspaces.find((workspaceItem) => workspaceItem._id === workspace_id)
    const members = Array.isArray(workspace?.members) ? workspace.members.filter((member) => member?._id) : []

    return (
        <section className="workspace-list" aria-labelledby="workspace-dm-title">
            <div className="workspace-list__header">
                <button type="button" className="workspace-list__toggle" aria-label="Alternar mensajes directos" disabled>
                    <i><Icons.ArrowDown/></i>
                </button>
                <span id="workspace-dm-title" className="workspace-list__title">Mensajes directos</span>
            </div>

            {loading && <p className="workspace-list__state">Cargando miembros...</p>}
            {!loading && error && <p className="workspace-list__state workspace-list__state--error">{error}</p>}
            {!loading && !error && members.length === 0 && (
                <p className="workspace-list__state">No hay usuarios disponibles.</p>
            )}

            {!loading && !error && members.length > 0 && (
                <ul className="workspace-list__items">
                    {members.map((member) => {
                        const isActive = member._id === user_id
                        const username = member.username?.trim() || member.email || 'Usuario'

                        return (
                            <li className="workspace-list__item" key={member._id}>
                                <Link
                                    to={`/workspace/${workspace_id}/dm/${member._id}`}
                                    className={`workspace-list__link ${isActive ? 'workspace-list__link--active' : ''}`}
                                    aria-current={isActive ? 'page' : undefined}
                                    title={username}
                                >
                                    <img
                                        className="workspace-list__avatar"
                                        src={member.profile_avatar_base64 || DEFAULT_AVATAR_URL}
                                        alt=""
                                    />
                                    <span className="workspace-list__link-text">{username}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div className="workspace-list__actions">
                <button type="button" className="workspace-list__action-button" onClick={openInviteModal}>
                    <i><Icons.Plus/></i>
                    <span>Invitar a personas</span>
                </button>
            </div>

            <ModalInviteUser isOpen={isInviteOpen} onClose={closeInviteModal} />
        </section>
    )
}

export default UserList
