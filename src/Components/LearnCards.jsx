import React from 'react'
import { Icons } from '../Assets/Icons/Icons'
import { HOME_LEARNING_RESOURCES } from '../constants/home.constants'
import slackLogo from '../Assets/svg/slack-new-logo.svg'

const LearnCards = () => {
    return (
        <div className="learning">
            {HOME_LEARNING_RESOURCES.map((resource) => (
                <article key={resource.title} className="learning-card">
                    <img
                        className="learning-card__image"
                        src={resource.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        onError={(event) => {
                            event.currentTarget.classList.add('learning-card__image--fallback')
                            event.currentTarget.src = slackLogo
                        }}
                    />
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
