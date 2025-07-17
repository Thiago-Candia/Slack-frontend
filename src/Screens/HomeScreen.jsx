import React from "react";
import { Link } from "react-router-dom";
import { NewWorkspace, WorkspaceList, NavHome } from "../Components/index.js";
import '../Styles/styles.css'
import LearnCards from "../Components/LearnCards.jsx";


const HomeScreen = () => {

    return (
        <div className="home-container">
            <NavHome/>
            <WorkspaceList/>
            <NewWorkspace/>
            <div className="no-workspace">
                <span>
                    ¿No encuentras tu espacio de trabajo?
                <Link to={'/login'}>
                    <span className="other-email"> Prueba con otro correo electrónico</span>
                </Link>
                </span>
            </div>
            <div className="learn-slack">
                <LearnCards/>
            </div>
        </div>
    )
}

export default HomeScreen
