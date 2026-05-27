import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NavHome = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigationItems = ['Funciones', 'Soluciones', 'Empresa', 'Recursos', 'Precios']

    return (
        <header className="home-nav">
            <nav className="home-nav__container" aria-label="Navegacion principal">
                <Link to="/home" className="home-nav__brand" aria-label="Slack, pagina de inicio">
                    <img
                        className="home-nav__logo"
                        src="https://a.slack-edge.com/3d92b39/marketing/img/nav/slack-salesforce-logo-nav-white.png"
                        alt="Slack"
                    />
                </Link>

                <div className="home-nav__desktop">
                    <ul className="home-nav__links">
                        {navigationItems.map((item) => (
                            <li key={item} className="home-nav__item">
                                <span className="home-nav__link">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="home-nav__actions home-nav__desktop">
                    <button type="button" className="home-nav__button home-nav__button--secondary">
                        Hablar con ventas
                    </button>
                    <Link to="/new-workspace" className="home-nav__button home-nav__button--primary">
                        Crear un nuevo espacio de trabajo
                    </Link>
                </div>

                <button
                    type="button"
                    className="home-nav__toggle"
                    onClick={() => setIsMenuOpen((prevState) => !prevState)}
                    aria-expanded={isMenuOpen}
                    aria-controls="home-navigation-menu"
                    aria-label={isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
                >
                    <span className={`home-nav__hamburger ${isMenuOpen ? 'home-nav__hamburger--open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>

                <div
                    id="home-navigation-menu"
                    className={`home-nav__mobile-menu ${isMenuOpen ? 'home-nav__mobile-menu--open' : ''}`}
                >
                    <ul className="home-nav__mobile-links">
                        {navigationItems.map((item) => (
                            <li key={item} className="home-nav__mobile-item">
                                <span className="home-nav__link">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="home-nav__mobile-actions">
                        <button type="button" className="home-nav__button home-nav__button--secondary">
                            Hablar con ventas
                        </button>
                        <Link to="/new-workspace" className="home-nav__button home-nav__button--primary">
                            Crear espacio de trabajo
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavHome
