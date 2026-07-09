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
        <section className="sidebar-list-section" aria-labelledby="workspace-dm-title">
            <div className="sidebar-list-title">
                <button type="button" className="btn-config" aria-label="Alternar mensajes directos" disabled>
                    <i><Icons.ArrowDown/></i>
                </button>
                <span id="workspace-dm-title">Mensajes directos</span>
            </div>

            {loading && <p className="sidebar-list-state">Cargando miembros...</p>}
            {!loading && error && <p className="sidebar-list-state sidebar-list-state--error">{error}</p>}
            {!loading && !error && members.length === 0 && (
                <p className="sidebar-list-state">No hay usuarios disponibles.</p>
            )}

            {!loading && !error && members.length > 0 && (
                <ul className="user-list">
                    {members.map((member) => {
                        const isActive = member._id === user_id
                        const username = member.username?.trim() || member.email || 'Usuario'

                        return (
                            <li className="user-item" key={member._id}>
                                <Link
                                    to={`/workspace/${workspace_id}/dm/${member._id}`}
                                    className={`sidebar-list-link ${isActive ? 'sidebar-list-link--active' : ''}`}
                                    aria-current={isActive ? 'page' : undefined}
                                    title={username}
                                >
                                    <img src={member.profile_avatar_base64 || DEFAULT_AVATAR_URL} alt="" />
                                    <span>{username}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div className="container-btn-list">
                <button type="button" className="btn-config btn-list-sidebar text" onClick={openInviteModal}>
                    <i><Icons.Plus/></i>
                    <span>Invitar a personas</span>
                </button>
            </div>

            <ModalInviteUser isOpen={isInviteOpen} onClose={closeInviteModal} />
        </section>
    )
}

export default UserList
