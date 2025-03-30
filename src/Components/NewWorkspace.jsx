import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/styles.css'

const NewWorkspace = () => {
    return (
    <div className="new-workspace-container">
        <div className='new-workspace'>
            <div className="img new-workspace-item">
                <img src="https://a.slack-edge.com/613463e/marketing/img/homepage/bold-existing-users/create-new-workspace-module/woman-with-laptop-color-background.png" alt="" />
            </div>
            <div className="new-workspace-item">
                <p>¿Quieres usar Slack con otro equipo?</p>
            </div>
            <div className="new-workspace-item">
                <Link to={'/new-workspace'}>
                    <button className="btn-new">
                        CREAR UN NUEVO ESPACIO DE TRABAJO
                    </button>
                </Link>
            </div>

        </div>

    </div>
    )
}

export default NewWorkspace