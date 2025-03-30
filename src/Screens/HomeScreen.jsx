import React from "react";
import { Link } from "react-router-dom";
import { NewWorkspace, WorkspaceList, NavHome } from "../Components/index.js";
import '../Styles/styles.css'


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
        </div>
    )
}

export default HomeScreen
