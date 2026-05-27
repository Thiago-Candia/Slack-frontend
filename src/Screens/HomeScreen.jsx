import React from "react"
import { Link } from "react-router-dom"
import { NewWorkspace, WorkspaceList, NavHome } from "../Components/index.js"
import LearnCards from "../Components/LearnCards.jsx"
import "../Styles/styles.css"

const HomeScreen = () => {
    return (
        <div className="home">
            <NavHome />
            <main className="home__main">
                <div className="home__content">
                    <WorkspaceList />
                    <NewWorkspace />
                    <p className="home__account-help">
                        <span>&iquest;No encuentras tu espacio de trabajo?</span>
                        <Link to="/login" className="home__account-link">
                            Prueba con otro correo electr&oacute;nico
                        </Link>
                    </p>
                    <section className="home__learning" aria-label="Recursos para aprender Slack">
                        <LearnCards />
                    </section>
                </div>
            </main>
        </div>
    )
}

export default HomeScreen
