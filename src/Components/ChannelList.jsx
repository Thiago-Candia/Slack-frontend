import React, { useContext, useState } from 'react'
import { ChannelContext } from '../Context/ChannelContext'
import { Link, useParams } from 'react-router-dom'
import { Icons } from '../Assets/Icons/Icons'
import ModalCreateChannel from './ModalCreateChannel'
import useModal from '../hooks/useModal'

const ChannelList = () => {

    const { channels } = useContext(ChannelContext)
    const [isModalOpen, setIsModalOpen] = useState(false) //Estado para controlar el modal
    const {isOpen: isProfileModalOpen,  openModal: openProfileModal, closeModal: closeProfileModal} = useModal()
    const { workspace_id, channel_id } = useParams()

    return (
        <>
            <div className='sidebar-list-title'>
                <button className='btn-config'>
                    <i>
                        <Icons.ArrowDown/>
                    </i>
                </button>
                <span>Canales</span>
            </div>
                <ul className="channel-list">
                    {Array.isArray(channels) && channels.length > 0 ? (
                        channels.map((channel) => (
                            <li key={channel._id} className='channel-item'>
                                <Link to={`/workspace/${workspace_id}/channel/${channel._id}`}>
                                    <div className='channel-item-name'>
                                        <i>
                                            <Icons.Hashtag/>
                                        </i>
                                        <span>
                                            {channel.name}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>No hay canales disponibles.</p>
                    )}
                    <div className='create-channel container-btn-list'>
                        <button className='btn-config btn-list-sidebar text' onClick={() => setIsModalOpen(true)}>
                            <i><Icons.Plus/></i>
                            <span>
                                Agregar canales
                            </span>
                        </button>
                    </div>
                </ul>
        {/* Modal para crear canal */}
        <ModalCreateChannel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}

export default ChannelList