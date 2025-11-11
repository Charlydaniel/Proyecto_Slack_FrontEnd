import '../Workspace-components/WorkspaceComponent.css'
import { RiHome6Line } from "react-icons/ri";
import DeleteWorkspace from './DeleteWorkspaceComponent';
import '../Workspace-components/WorkspaceComponent.css'


export default function DeleteComponentBackground() {


return (
    <div className='workspace-component'>
      <header className="workspaces-header">        
      </header>
      <div className='workspace-body'>
        <nav className="workspace-nav-left">
          <div className='workspace-nav-left-button'>
          </div>
          <div className='workspace-nav-left-buttons-container --off'>
            <div className='button-nav-left'>
              <div className='workspace-nav-left-button --white'>
                <RiHome6Line className='workspace-icon-left-nav' />
              </div>
              <span className='workspace-icon-left-nav-span'>Inicio</span>
            </div>
            <div className='workspace-nav-left-button-text'>
              <button className='workspace-icon-left-nav-text-button'>...</button>
              <span className='workspace-icon-left-nav-text'>Más</span>
            </div>
          </div>
        </nav>
        <div className='create-container'>
          <DeleteWorkspace />
        </div>
      </div>
    </div>
  )
}