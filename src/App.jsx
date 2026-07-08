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
        <Route path='/home' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
          <Route path='/new-workspace'element={
          <CreateWorkspaceContextProvider>
            <CreateWorkspaceScreen />
          </CreateWorkspaceContextProvider>
            }/>
        <Route path='/workspace/:workspace_id/*' element={<WorkspaceWrapper />} />
        <Route path='/workspace/:workspace_id/channel/:channel_id/*' element={<WorkspaceWrapper />} />
        <Route path='/workspace/:workspace_id/dm/:user_id/*' element={<WorkspaceWrapper />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/reset-password' element={<ResetPasswordScreen />} />
        </Route>
        <Route path='/rewrite-password' element={<RewritePasswordScreen />} />
      </Routes>
    </div>
  )
}

export default App
