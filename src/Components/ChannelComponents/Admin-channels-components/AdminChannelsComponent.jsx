import { useContext, useState } from 'react'
import './admin-channels.css'
import { WorkspaceContext } from '../../../Contexts/WorkspaceContext'
import { CiMenuKebab } from "react-icons/ci";

const AdminChannelComponent = () => {

    const [openChannels, setOpenChannels] = useState(false)
    const { workspace, channel, wpChannels, WpSetChannel, WpSetWorkspace, WpSetWpChannels } = useContext(WorkspaceContext)


    const onOpenItem = () => {
        setOpenChannels(!openChannels)
    }

    return (

        <div className="body-admin-channel">

            <button className="workspace-nav-dropdown-btn"
                onClick={onOpenItem}>
                {
                    !openChannels
                        ?
                        <div>► Canales</div>
                        :
                        <div> ▼   Canales</div>
                }
            </button>
            <div className='popup-menu'
                onMouseLeave={() => setOpenOptionsChannel(false)}
            >
            </div>

        </div>
    )


}
export default AdminChannelComponent