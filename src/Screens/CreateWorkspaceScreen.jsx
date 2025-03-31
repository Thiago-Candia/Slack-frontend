import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateWorkspaceContext } from '../Context/CreateWorkspaceContext'

const CreateWorkspaceScreen = () => {

    const [name, setName] = useState('')
    const navigate = useNavigate()
    const {createWorkspace, isCreatingWorkspace, error} = useContext(CreateWorkspaceContext)

    const handleSubmitNewWorkspace = async (e) => {
        e.preventDefault()
        await createWorkspace(name)
        navigate('/home')
    }

    return (
        <div className='create-workspace'>
            <div className='create-workspace-container'>
                <h2>Crea tu espacio de trabajo</h2>
                <form onSubmit={handleSubmitNewWorkspace}>
                    <label htmlFor="">Nombre del espacio de trabajo</label>
                    <input 
                    type="text" 
                    placeholder='Workspace Name' 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                    <button type='submit' disabled={isCreatingWorkspace}>
                        <span>{isCreatingWorkspace ? 'Cargando...' : 'Crear espacio de trabajo'}</span>
                    </button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default CreateWorkspaceScreen