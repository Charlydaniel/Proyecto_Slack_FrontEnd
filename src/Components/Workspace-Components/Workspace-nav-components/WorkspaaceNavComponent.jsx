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


export default function WorkspaceNavComponent(){

    const [openChannels, setOpenChannels] = useState(false)
    const [openChats, setOpenChats] = useState(false)
    const { sendRequest, loading, response, error } = useFetch()

    const {new_workspace,name,members,user,image,setImageUrl,setName,setUser,setMembers
            ,setNewWorkspace} = useContext(CreateWorkspaceContext)

    useEffect(
        ()=>{
            const result = sendRequest(getChanelsList())
        },[]
    )

    return(
    
    <nav className="workspace-nav">
        <header className='workspace-nav-header'>
            <div className='workspace-nav-name'>
                NOMBRE WP
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
        <hr className='workspace-nav-hr'/>
        <div className='workspace-nav-option'>
            <MdOutlineStarOutline />
            <span>Favoritos</span>
        </div>
        </section>
        <section className='workspace-nav-channes'>
        <div className='workspace-nav-channes-list'>
            <button className="workspace-nav-dropdown-btn"  
                onClick={() => setOpenChannels(!openChannels)}>
                {
                openChannels
                ?
                    <div>► Canales</div> 
                    :
                    <div> ▼   Canales</div> 
                }
            </button>

                {openChannels &&
                    (
                    <ul className='workspace-nav-dropdown-list'>
                        <li>Canal 1</li>
                        <li>Canal 2</li>
                        <li>Canal 3</li>
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