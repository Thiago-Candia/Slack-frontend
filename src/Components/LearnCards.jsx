import React from 'react'
import { Icons } from '../Assets/Icons/Icons'

const resources = [
    {
        category: 'Soluciones',
        title: 'Descubre c\u00f3mo funciona Slack para todo tipo de equipos',
        linkText: 'M\u00e1s informaci\u00f3n',
        image: 'https://a.slack-edge.com/4ebba/marketing/img/homepage/bold-existing-users/promos-only-social/slack-for-all-teams.png'
    },
    {
        category: 'Blog',
        title: 'Presentamos Slack Connect: el futuro de la comunicaci\u00f3n empresarial',
        linkText: 'M\u00e1s informaci\u00f3n',
        image: 'https://a.slack-edge.com/4ebba/marketing/img/homepage/bold-existing-users/promos-only-social/slack-connect-illustration.png'
    },
    {
        category: 'Blog',
        title: 'C\u00f3mo usar los canales para organizar tu vida laboral',
        linkText: 'Leer la historia',
        image: 'https://a.slack-edge.com/4ebba/marketing/img/homepage/bold-existing-users/promos-only-social/channels-and-work-illustration.png'
    }
]

const LearnCards = () => {
    return (
        <div className="learning">
            {resources.map((resource) => (
                <article key={resource.title} className="learning-card">
                    <img className="learning-card__image" src={resource.image} alt="" />
                    <div className="learning-card__body">
                        <p className="learning-card__category">{resource.category}</p>
                        <h2 className="learning-card__title">{resource.title}</h2>
                        <span className="learning-card__link">
                            {resource.linkText}
                            <Icons.ArrowRight />
                        </span>
                    </div>
                </article>
            ))}
        </div>
    )
}

export default LearnCards
