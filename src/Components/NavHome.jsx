import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HOME_ASSETS, HOME_NAVIGATION_ITEMS } from '../constants/home.constants'

const NavHome = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <header className="home-nav">
            <nav className="home-nav__container" aria-label="Navegaci\u00f3n principal">
                <Link to="/home" className="home-nav__brand" aria-label="Slack, p\u00e1gina de inicio">
                    <img
                        className="home-nav__logo"
                        src={HOME_ASSETS.navLogo}
                        alt="Slack"
                        width="109"
                        height="28"
                        decoding="async"
                    />
                </Link>

                <div className="home-nav__desktop">
                    <ul className="home-nav__links">
                        {HOME_NAVIGATION_ITEMS.map((item) => (
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
                    aria-label={isMenuOpen ? 'Cerrar men\u00fa' : 'Abrir men\u00fa'}
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
                        {HOME_NAVIGATION_ITEMS.map((item) => (
                            <li key={item} className="home-nav__mobile-item">
                                <span className="home-nav__link">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="home-nav__mobile-actions">
                        <button type="button" className="home-nav__button home-nav__button--secondary">
                            Hablar con ventas
                        </button>
                        <Link
                            to="/new-workspace"
                            className="home-nav__button home-nav__button--primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Crear espacio de trabajo
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavHome
