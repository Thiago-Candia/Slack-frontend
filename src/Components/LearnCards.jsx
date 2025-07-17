import React from 'react'
import { Icons } from '../Assets/Icons/Icons'

const LearnCards = () => {
    return (
        <div className='learn-container'>
            <div className='card-container'>
                <div className='card-item'>
                    <img src='https://a.slack-edge.com/4ebba/marketing/img/homepage/bold-existing-users/promos-only-social/slack-for-all-teams.png'></img>
                </div>
                <div className='card-item'>
                    <span className='text-card'>Soluciones</span>
                    <p className='text-card'>Descubre cómo funciona Slack para todo tipo de equipos</p>
                </div>
                <div className='card-item'>
                    <span className='text-card'>Más información</span>
                    <i><Icons.ArrowRight/></i>
                </div>
            </div>
            <div className='card-container'>
                <div className='card-item'>
                    <img src='https://a.slack-edge.com/4ebba/marketing/img/homepage/bold-existing-users/promos-only-social/slack-connect-illustration.png'></img>
                </div>
                <div className='card-item'>
                    <span className='text-card'>Blog</span>
                    <p className='text-card'>Presentamos Slack Connect: el futuro de la comunicación empresarial</p>
                </div>
                <div className='card-item'>
                    <span className='text-card'>Más información</span>
                    <i><Icons.ArrowRight/></i>
                </div>
            </div>
            <div className='card-container'>
                <div className='card-item'>
                    <img src='https://a.slack-edge.com/4ebba/marketing/img/homepage/bold-existing-users/promos-only-social/channels-and-work-illustration.png'></img>
                </div>
                <div className='card-item'>
                    <span className='text-card'>Blog</span>
                    <p className='text-card'>Cómo usar los canales para organizar tu vida laboral</p>
                </div>
                <div className='card-item'>
                    <span className='text-card'>Leer la historia</span>
                    <i><Icons.ArrowRight/></i>
                </div>
            </div>
        </div>
    )
}

export default LearnCards