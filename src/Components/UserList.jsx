import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { WorkspaceContext } from '../Context/WorkspaceContext'
import '../Styles/styles.css'
import { Icons } from '../Assets/Icons/Icons'
import useModal from '../hooks/useModal'
import ModalInviteUser from './ModalInviteUser'

const UserList = () => {

    const { user } = useContext(WorkspaceContext)
    const { workspaces } = useContext(WorkspaceContext)
    const {isOpen: isInviteOpen, openModal: openInviteModal, closeModal: closeInviteModal} = useModal()
    const { workspace_id } = useParams()
    const workspace = workspaces.find(workspace => workspace._id === workspace_id)

    return (
        <>
            <div className='sidebar-list-title'>
                <button className='btn-config'>
                    <i><Icons.ArrowDown/></i>
                </button>
                <span>Mensajes directos</span>
            </div>
            <ul className='user-list'>
                {workspace ? (
                    workspace.members.map((member) => (
                        <li className='user-item' key={member._id}> 
                            <Link to={`/workspace/${workspace_id}/dm/${member._id}`}>
                                <img src={member.profile_avatar_base64}/>
                                <span>{member.username} </span>
                            </Link>
                        </li>
                )))
                : (
                    <p>No hay usuarios disponibles.</p>
                )}
            </ul>
            <div className='invite-channel container-btn-list'>
                <button className='btn-config btn-list-sidebar text' onClick={openInviteModal}>
                    <i><Icons.Plus/></i>
                    <span>Invitar a personas</span>
                </button>
            </div>
            {/* Modal para invitar usuarios */}
            <ModalInviteUser isOpen={isInviteOpen} onClose={closeInviteModal} />
        </>
        
    )
    
}


export default UserList