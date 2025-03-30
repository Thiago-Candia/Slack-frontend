import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ResetPasswordScreen from './Screens/ResetPasswordScreen'
import RewritePasswordScreen from './Screens/RewritePasswordScreen'
import ProtectedRoute from './Components/ProtectedRoute'
import HomeScreen from './Screens/HomeScreen'
import WorkspaceWrapper from './Components/WorkspaceWrapper' 
import CreateWorkspaceScreen from './Screens/CreateWorkspaceScreen'
import { CreateWorkspaceContextProvider } from './Context/CreateWorkspaceContext'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginScreen />} />
        {/* HOME */}
        <Route path='/home' element={<HomeScreen />} />
        {/* LOGIN */}
        <Route path='/login' element={<LoginScreen />} />
        {/* REGISTER */}
        <Route path='/register' element={<RegisterScreen />} />
        {/* COMP CREAR WORKSPACE */}
          <Route path='/new-workspace'element={
          <CreateWorkspaceContextProvider>
            <CreateWorkspaceScreen />
          </CreateWorkspaceContextProvider>
            }/>
        {/* Ruta general para workspaces */}
        <Route path='/workspace/:workspace_id/*' element={<WorkspaceWrapper />} />
        {/* Ruta para canales dentro de workspaces */}
        <Route path='/workspace/:workspace_id/channel/:channel_id/*' element={<WorkspaceWrapper />} />
        <Route element={<ProtectedRoute />}> {/* Middleware */}
          <Route path='/reset-password' element={<ResetPasswordScreen />} />
        </Route>
        <Route path='/rewrite-password' element={<RewritePasswordScreen />} />
      </Routes>
    </div>
  )
}

export default App
