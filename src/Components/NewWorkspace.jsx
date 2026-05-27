import React from 'react'
import { Link } from 'react-router-dom'

const NewWorkspace = () => {
    return (
        <section className="workspace-cta" aria-label="Crear otro espacio de trabajo">
            <div className="workspace-cta__image-wrapper">
                <img
                    className="workspace-cta__image"
                    src="https://a.slack-edge.com/613463e/marketing/img/homepage/bold-existing-users/create-new-workspace-module/woman-with-laptop-color-background.png"
                    alt=""
                />
            </div>
            <p className="workspace-cta__text">&iquest;Quieres usar Slack con otro equipo?</p>
            <Link to="/new-workspace" className="workspace-cta__button">
                Crear un nuevo espacio de trabajo
            </Link>
        </section>
    )
}

export default NewWorkspace
