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
import { useNavigate, useParams } from 'react-router-dom';
import { WorkspaceContext } from '../../../Contexts/WorkspaceContext';
import { CiMenuKebab } from "react-icons/ci";
import { useScreenSize } from '../../../Hooks/UsesCreenSize';



export default function WorkspaceNavComponent() {

    const [openChannels, setOpenChannels] = useState(false)
    const [openNav,setOpenNav]=useState(false)
    const [openOptionsChannel, setOpenOptionsChannel] = useState(false)
    const [openChats, setOpenChats] = useState(false)
    const { sendRequest, loading, response, error } = useFetch()
    const { IsMabileAndOpenNav,workspace, channel, wpChannels, WpSetChannel, WpSetWorkspace, WpSetWpChannels,SetIsMabileAndOpenNav } = useContext(WorkspaceContext)

    const { workspace_id } = useParams()
    const id_workspace = Number(workspace_id)
    const navidate = useNavigate()
    const isMobile = useScreenSize();


    useEffect(() => {
        if (isMobile) {
            setOpenNav(false);
        } else {
            setOpenNav(true);
            SetIsMabileAndOpenNav(false)
        }
    }, [isMobile]);

    const ChaangeOpenNav =()=>{
        setOpenNav(!openNav)
        
        !openNav?SetIsMabileAndOpenNav(true):SetIsMabileAndOpenNav(false)
    }


    const onOpenItem = () => {
        setOpenChannels(!openChannels)
    }
    const gotoChannel = (ch_id) => {
        WpSetChannel(ch_id)
    }
    const GoTodeleteChannel = () => {
        navidate('/admin-channels/'+workspace.id)
    }

    useEffect(
        () => {
            const getchannels = async () => {

                const result = await sendRequest(() => getChanelsList(id_workspace))
                const channels_data = result.data
                WpSetWpChannels(channels_data)
            }
            getchannels()
        }, []
    )


return (
        
            openNav
            ?
            (
            <div className='workspace-nav-container'>
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
                            <span className='workspace-nav-button-span'>Hilos de conversacion</span>
                        </div>
                        <div className='workspace-nav-option'>
                            <MdOutlineHeadset />
                            <span className='workspace-nav-button-span'>Juntas</span>
                        </div>
                        <div className='workspace-nav-option'>
                            <FaWpforms />
                            <span className='workspace-nav-button-span'>Directorios</span>
                        </div>
                        <hr className='workspace-nav-hr' />
                        <div className='workspace-nav-option'>
                            <MdOutlineStarOutline />
                            <span className='workspace-nav-button-span'>Favoritos</span>
                        </div>
                    </section>
                    <section className='workspace-nav-channes'>
                        <div className='workspace-nav-channel-list'>
                            <div className='workspace-nav-channel-list-options'>
                                    <button className="workspace-nav-dropdown-btn"
                                        onClick={onOpenItem}>
                                        {
                                            !openChannels
                                                ?
                                                <div>► 
                                                    <span className='workspace-nav-dropdown-btn-tx'>
                                                        Canales
                                                    </span>
                                                </div>
                                                :
                                                <div> ▼ 
                                                    <span className='workspace-nav-dropdown-btn-tx'>
                                                        Canales
                                                    </span>
                                                </div>
                                        }
                                    </button>
                                    <button className='workspace-nav-opt-btn'
                                        onClick={() => setOpenOptionsChannel(!openOptionsChannel)}>
                                        {
                                            !openOptionsChannel
                                                ?
                                                <CiMenuKebab className='menu-icon' />
                                                :
                                                <></>
                                        }
                                    </button>
                            </div>
                                    <div className='popup-menu'
                                        onMouseLeave={() => setOpenOptionsChannel(false)}
                                    >
                                    {
                                        openOptionsChannel
                                            ?
                                            <div className='workspace-nav-dropdown-list'>
                                                <button className='workspace-nav-dropdown-list-close-button'
                                                onClick={() => setOpenOptionsChannel(false)}>x</button>
                                                <ul className='ul-channels-menu'>
                                                    <li onClick={() => GoTodeleteChannel()}>
                                                        Administrar canales
                                                    </li>
                                                </ul>
                                            </div>
                                            :
                                            <div>
                                            </div>
                                    }
                                    </div>
                            {openChannels &&
                                (
                                    <ul className='workspace-nav-dropdown-list'>
                                        {
                                            wpChannels.length > 0
                                                ?
                                                (
                                                    wpChannels.map(
                                                        (ch) =>
                                                        (
                                                            <li
                                                                onClick={() => gotoChannel(ch.nombre)}
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
                                    !openChats
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
                {
                isMobile
                ?
                (
                    <div className='Open-nav-Button'
                        onClick={()=>(ChaangeOpenNav(false))}>
                                {'<'}
                    </div>
                )
                :
                <></>
            }

            </div>
            )
            :
            (
                <button className='Open-nav-Button'
                    onClick={()=>(ChaangeOpenNav(true))}>
                            {'>'}
                </button>
            )
            
            
        )
            
}