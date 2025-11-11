import './workspaceComponent.css'
import Spinner from '../../Spinner/Spinner'
import useFetch from '../../../Hooks/UseFetch'
import { useNavigate, useParams } from 'react-router-dom'
import getWorkspace, { deleteWorkspace } from '../../../services/workspaceServices'
import { LoginContext } from '../../../Contexts/LoginContext'
import { RiDeleteBin6Fill } from "react-icons/ri"
import { GoQuestion } from "react-icons/go"
import { PiBellThin } from "react-icons/pi"
import { ImFilesEmpty } from "react-icons/im"
import { LuMessagesSquare } from "react-icons/lu"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6"
import { RiHistoryLine, RiHome3Fill } from "react-icons/ri"
import { IoSearchOutline } from "react-icons/io5"
import { useContext, useEffect, useState } from 'react'
import ErrorComponent from '../../Error-components/ErrorComponent'



export default function WorkspaceCompoenent() {

  const { isLoading } = useContext(LoginContext)
  const { response, ok, message, error, sendRequest } = useFetch()
  const [workspace, setWorkspace] = useState(null)
  const [get_workspace_ok, setGetWorkspace] = useState(false)
  const { workspace_id } = useParams()

  const navigate = useNavigate()


  const onDelete = () => {
    navigate('/api/workspaces/delete/'+workspace.id)
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        const id = Number(workspace_id)
        const result = await sendRequest(() => getWorkspace(id))
        if (result.data.workspace) {
          setWorkspace(result.data.workspace)
          setGetWorkspace(result.ok)
        }
      } catch (err) {
        console.warn(err);
      }
    }
    fetchData()
  }, [workspace_id])


  if (isLoading) {
    return <Spinner />
  }

  if (!isLoading && error) {
    return <ErrorComponent error={
      { message: 'Workspace not found' }
    }
    />
  }

  if (!workspace === null && get_workspace_ok === null) {
    return <Spinner />
  }

  return (

    <div className='workspace-component'>
      <header className="workspaces-header">
        <nav className='workspaces-header-nav'>
          <div className='nav-left'></div>
          <div className='workspace-history-arrows'>
            <FaArrowLeft className='arrow-history' />
            <FaArrowRight className='arrow-history' />
          </div>
          <div className='workspace-history-view'>
            <RiHistoryLine className='history-view' />
          </div>
          <div className='workspace-search-container'>
            <input
              placeholder={`Buscar en ${workspace?.nombre || 'Buscar..'}`}
              className="workspace-search"
              type="text"
            />
            <IoSearchOutline className='workspace-search-button' />
          </div>
        </nav>
        <div className='header-right'>
          <GoQuestion className='question-icon' />
        </div>
      </header>

      <div className='workspace-body'>
        <nav className="workspace-nav-left">
          <div className='workspace-nav-left-buttons-container'>

            <div className='workspace-nav-left-button --profile'>
              <img
                className='workspace-icono'
                src={workspace?.img_workspace}
                alt="Profile"
              />
            </div>

            <div className='button-nav-left'>
              <div className='workspace-nav-left-button --white'>
                <RiHome3Fill className='workspace-icon-left-nav' />
              </div>
              <span className='workspace-icon-left-nav-span'>Inicio</span>
            </div>

            <div className='button-nav-left'>
              <div className='workspace-nav-left-button'>
                <LuMessagesSquare className='workspace-icon-left-nav' />
              </div>
              <span className='workspace-icon-left-nav-span'>Mensajes directos</span>
            </div>

            <div>
              <div className='workspace-nav-left-button'>
                <PiBellThin className='workspace-icon-left-nav' />
              </div>
              <span className='workspace-icon-left-nav-span'>Actividad</span>
            </div>

            <div>
              <div className='workspace-nav-left-button'>
                <ImFilesEmpty className='workspace-icon-left-nav' />
              </div>
              <span className='workspace-icon-left-nav-span'>Archivos</span>
            </div>
          </div>
          <div className='workspace-nav-left-inf-container'>
            <div className='workspace-nav-left-button-text'>
              <div className='nav-inf-section'>
                <button className='workspace-icon-left-nav-text-button'>...</button>
              </div>
              <div className='nav-inf-section'>
                <button className='workspace-icon-left-nav-more'>+</button>
              </div>
              <div className='nav-inf-section'>
                <RiDeleteBin6Fill
                  onClick={onDelete}
                  className='workspace-icon-left-nav'
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

        </nav>

        <div className='workspace-chats'>

        </div>
      </div>
    </div>
  )
}
