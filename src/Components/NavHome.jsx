import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NavHome = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className='header-home'>
            <nav className='nav-home'>
                <div className='nav-home-item'>
                    <div className='logo-slack'>
                        <img src="https://a.slack-edge.com/3d92b39/marketing/img/nav/slack-salesforce-logo-nav-white.png" alt="Slack Logo"/>
                    </div>
                </div>
                {/* Menú para desktop */}
                <div className='nav-home-item desktop-menu'>
                    <ul className='nav-home-list'>
                        <li><span className='text-nav'>Funciones</span></li>
                        <li><span className='text-nav'>Soluciones</span></li>
                        <li><span className='text-nav'>Empresa</span></li>
                        <li><span className='text-nav'>Recursos</span></li>
                        <li><span className='text-nav'>Precios</span></li>
                    </ul>
                </div>
                {/* Botones para desktop */}
                <div className='nav-home-item nav-home-item-btn desktop-menu'>
                    <Link to={'/home'}>
                        <button className='btn-nav-home text-nav btn-nav-home-ventas'>
                            <span className='text-nav'>Hablar con ventas</span>
                        </button>
                    </Link>
                    <Link to={'/home'}>
                        <button className='btn-nav-home text-nav btn-nav-home-create-workspace'>
                            <Link to={'/new-workspace'}>
                                <span className='text-nav'>Crear un nuevo espacio de trabajo</span>
                            </Link>
                        </button>
                    </Link>
                </div>
                {/* Menú hamburguesa para mobile */}
                <div className='mobile-menu-btn' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                {/* Menú desplegable mobile */}
                <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li><span className='text-nav'>Funciones</span></li>
                        <li><span className='text-nav'>Soluciones</span></li>
                        <li><span className='text-nav'>Empresa</span></li>
                        <li><span className='text-nav'>Recursos</span></li>
                        <li><span className='text-nav'>Precios</span></li>
                        <li>
                            <Link to={'/home'} className='mobile-nav-btn'>
                                <span className='text-nav'>Hablar con ventas</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/home'} className='mobile-nav-btn'>
                                <span className='text-nav'>Crear espacio de trabajo</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default NavHome