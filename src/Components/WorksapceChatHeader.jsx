import React from "react"
import { useNavigate } from "react-router-dom"
import { Icons } from "../Assets/Icons/Icons"

const WorkspaceChatHeader = () => {

    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }
    const goForward = () => {
        navigate(+1)
    }

    return (
    <div className="workspace-header-chat-container">
        {/* Espacio lateral izquierdo */}
        <div className="workspace-header-chat-space"></div>
        {/* Contenido principal del header */}
        <div className="workspace-header-chat-content">
        {/* Navegación */}
        <div className="workspace-header-chat-content-item nav-buttons">
            <button onClick={goBack} className="nav-button">
                <Icons.ArrowBack />
            </button>
            <button onClick={goForward} className="nav-button">
                <Icons.ArrowForward />
            </button>
            <button className="nav-button">
                <Icons.History />
            </button>
        </div>
        {/* Barra de búsqueda */}
        <div className="workspace-header-chat-content-item search-bar">
            <input type="text" placeholder="Buscar en Grupo de prueba" />
            <Icons.Search className="search-icon" />
        </div>
        {/* Botón de versión de prueba y ayuda */}
        <div className="workspace-header-chat-content-item pro-version">
            <button className="pro-button">
                <Icons.Slack />
            Versión de prueba de Pro de Slack
            </button>
            <button className="help-button">
                <Icons.Help />
            </button>
        </div>
        </div>
    </div>
    )
}

export default WorkspaceChatHeader
