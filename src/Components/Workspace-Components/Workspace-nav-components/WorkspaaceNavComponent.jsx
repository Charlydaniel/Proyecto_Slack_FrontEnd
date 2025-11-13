import './workspace-nav.css'
import React, { useContext, useEffect, useState } from 'react'
import { RiChatSmile3Line } from "react-icons/ri";
import { MdOutlineHeadset } from "react-icons/md";
import { FaWpforms } from "react-icons/fa6";
import { MdOutlineStarOutline } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { LuFilePenLine } from "react-icons/lu";
import { getChanelsList } from '../../../services/ChannelService';
import useFetch from '../../../Hooks/UseFetch';
import { CreateWorkspaceContext } from '../../../Contexts/CreateWorkspaceContext';
import { useParams } from 'react-router-dom';
import { LoginContext } from '../../../Contexts/LoginContext';
import { WorkspaceContext } from '../../../Contexts/WorkspaceContext';


export default function WorkspaceNavComponent() {

    const [openChannels, setOpenChannels] = useState(false)
    const [openChats, setOpenChats] = useState(false)
    const [channelList, SetChannel] = useState([])
    const { sendRequest, loading, response, error } = useFetch()
    const {workspace,channel, WpSetChannel, WpSetWorkspace}=useContext(WorkspaceContext)


    const { workspace_id } = useParams()
    const id_workspace = Number(workspace_id)


    const onOpenItem =  ()=>{
        setOpenChannels(!openChannels)
    }
    const gotoChannel=(ch_id)=>{
        WpSetChannel(ch_id)
        console.log(ch_id)
    }

    useEffect(
        () => {
            const getchannels = async () => {
                
                    const result = await sendRequest(() => getChanelsList(id_workspace))
                    const channels_data=result.data
                    SetChannel(channels_data)
            }
            getchannels()
        }, []
    )


    return (

        <nav className="workspace-nav">
            <header className='workspace-nav-header'>
                <div className='workspace-nav-name'>
                    {workspace.nombre}
                </div>
                <div className='workspace-nav-name-options'>
                    <IoSettingsOutline />
                    <LuFilePenLine />
                </div>
            </header>
            <section className='workspace-nav-options'>
                <div className='workspace-nav-option'>
                    <RiChatSmile3Line />
                    <span>Hilos de conversacion</span>
                </div>
                <div className='workspace-nav-option'>
                    <MdOutlineHeadset />
                    <span>Juntas</span>
                </div>
                <div className='workspace-nav-option'>
                    <FaWpforms />
                    <span>Directorios</span>
                </div>
                <hr className='workspace-nav-hr' />
                <div className='workspace-nav-option'>
                    <MdOutlineStarOutline />
                    <span>Favoritos</span>
                </div>
            </section>
            <section className='workspace-nav-channes'>
                <div className='workspace-nav-channes-list'>
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

                    {openChannels &&
                        (
                            <ul className='workspace-nav-dropdown-list'>
                                {
                                    channelList.length > 0
                                    ?
                                    (
                                    
                                    channelList.map(

                                        (ch)=>
                                        (   
                                            <li 
                                            onClick={()=>gotoChannel(ch.nombre)}
                                            key={ch.id}
                                            >
                                            {ch.nombre}
                                            </li>
                                        )
                                        )
                                    )
                                    :
                                    (
                                    <li> Sin canales ...</li>
                                    )
                                }

                            </ul>
                        )
                    }
                </div>
                <div className='workspace-nav-chats-list'>
                    <button className="workspace-nav-dropdown-btn"
                        onClick={() => setOpenChats(!openChats)}>
                        {
                            openChats
                                ?
                                <div>► Chats</div>
                                :
                                <div>▼ Chats</div>
                        }
                    </button>
                    {openChats &&
                        (
                            <ul className='workspace-nav-dropdown-list'>
                                <li>Canal 1</li>
                                <li>Canal 2</li>
                                <li>Canal 3</li>
                            </ul>
                        )
                    }
                </div>
            </section>

        </nav>
    )


}