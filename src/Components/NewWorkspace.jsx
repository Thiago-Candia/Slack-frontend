import React from 'react'
import { Link } from 'react-router-dom'
import { HOME_ASSETS } from '../constants/home.constants'
import slackLogo from '../Assets/svg/slack-new-logo.svg'

const NewWorkspace = () => {
    return (
        <section className="workspace-cta" aria-label="Crear otro espacio de trabajo">
            <div className="workspace-cta__image-wrapper">
                <img
                    className="workspace-cta__image"
                    src={HOME_ASSETS.createWorkspace}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                        event.currentTarget.classList.add('workspace-cta__image--fallback')
                        event.currentTarget.src = slackLogo
                    }}
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
