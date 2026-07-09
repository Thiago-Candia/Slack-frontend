import React, { useContext, useState } from 'react'
import { ChannelContext } from '../Context/ChannelContext'
import { Link, useParams } from 'react-router-dom'
import { Icons } from '../Assets/Icons/Icons'
import ModalCreateChannel from './ModalCreateChannel'

const ChannelList = () => {
    const { channels, loading, error } = useContext(ChannelContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { workspace_id, channel_id } = useParams()
    const channelItems = Array.isArray(channels) ? channels.filter((channel) => channel?._id) : []

    return (
        <section className="sidebar-list-section" aria-labelledby="workspace-channels-title">
            <div className="sidebar-list-title">
                <button type="button" className="btn-config" aria-label="Alternar canales" disabled>
                    <i><Icons.ArrowDown/></i>
                </button>
                <span id="workspace-channels-title">Canales</span>
            </div>

            {loading && <p className="sidebar-list-state">Cargando canales...</p>}
            {!loading && error && <p className="sidebar-list-state sidebar-list-state--error">{error}</p>}
            {!loading && !error && channelItems.length === 0 && (
                <p className="sidebar-list-state">No hay canales disponibles.</p>
            )}

            {!loading && !error && channelItems.length > 0 && (
                <ul className="channel-list">
                    {channelItems.map((channel) => {
                        const isActive = channel._id === channel_id
                        const channelName = channel.name?.trim() || 'Canal sin nombre'

                        return (
                            <li key={channel._id} className="channel-item">
                                <Link
                                    to={`/workspace/${workspace_id}/channel/${channel._id}`}
                                    className={`sidebar-list-link ${isActive ? 'sidebar-list-link--active' : ''}`}
                                    aria-current={isActive ? 'page' : undefined}
                                    title={channelName}
                                >
                                    <span className="channel-item-name">
                                        <i><Icons.Hashtag/></i>
                                        <span>{channelName}</span>
                                    </span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div className="container-btn-list">
                <button type="button" className="btn-config btn-list-sidebar text" onClick={() => setIsModalOpen(true)}>
                    <i><Icons.Plus/></i>
                    <span>Agregar canales</span>
                </button>
            </div>

            <ModalCreateChannel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    )
}

export default ChannelList
