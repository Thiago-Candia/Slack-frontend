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
        <section className="workspace-list" aria-labelledby="workspace-channels-title">
            <div className="workspace-list__header">
                <button type="button" className="workspace-list__toggle" aria-label="Alternar canales" disabled>
                    <i><Icons.ArrowDown/></i>
                </button>
                <span id="workspace-channels-title" className="workspace-list__title">Canales</span>
            </div>

            {loading && <p className="workspace-list__state">Cargando canales...</p>}
            {!loading && error && <p className="workspace-list__state workspace-list__state--error">{error}</p>}
            {!loading && !error && channelItems.length === 0 && (
                <p className="workspace-list__state">No hay canales disponibles.</p>
            )}

            {!loading && !error && channelItems.length > 0 && (
                <ul className="workspace-list__items">
                    {channelItems.map((channel) => {
                        const isActive = channel._id === channel_id
                        const channelName = channel.name?.trim() || 'Canal sin nombre'

                        return (
                            <li key={channel._id} className="workspace-list__item">
                                <Link
                                    to={`/workspace/${workspace_id}/channel/${channel._id}`}
                                    className={`workspace-list__link ${isActive ? 'workspace-list__link--active' : ''}`}
                                    aria-current={isActive ? 'page' : undefined}
                                    title={channelName}
                                >
                                    <span className="workspace-list__link-icon"><Icons.Hashtag/></span>
                                    <span className="workspace-list__link-text">{channelName}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div className="workspace-list__actions">
                <button type="button" className="workspace-list__action-button" onClick={() => setIsModalOpen(true)}>
                    <i><Icons.Plus/></i>
                    <span>Agregar canales</span>
                </button>
            </div>

            <ModalCreateChannel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    )
}

export default ChannelList
