import { useContext } from "react"
import { CreateWorkspaceContext } from "../../Contexts/CreateWorkspaceContext"
import { WorkspaceContext } from "../../Contexts/WorkspaceContext"
import { BsBackpack } from "react-icons/bs"
import './channel-component.css'
import { IoIosStarOutline } from "react-icons/io";
import { PiHeadset } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineUserAdd } from "react-icons/ai";



export default function ChatComponent(){

const {workspace,channel,wpChannels, WpSetChannel, WpSetWorkspace,WpSetWpChannels}=useContext(WorkspaceContext)



    return(
        <div className="chat-section-body">
            <header className="chat-header">
                <aside className="chat-header-aside-left">
                    <button className="chat-header-button">
                        <IoIosStarOutline className="chat-header-favorite"/>
                    </button>
                    <h1 className="chat-header-channel">
                        {channel}
                    </h1>
                </aside>
                <aside className="chat-header-aside-right">
                    <div className="chat-header-aside-right-block">
                    </div>
                    <button className="chat-header-right-section-one">
                        <AiOutlineUserAdd />
                        Invita a compañeros de equipo
                    </button>
                    <div className="chat-header-right-section-two">
                        <button className="chat-header-button">
                            <PiHeadset  />
                        </button>
                        <button className="chat-header-button">
                            <IoMdSearch />
                        </button>
                        <button className="chat-header-button">
                            <SlOptionsVertical />
                        </button>
                    </div>
                </aside>

            </header>
            <div className="chat-body">
                <div className="chat-read">

                </div>
                <div className="chat-write">

                </div>
            </div>
        </div>
    )
}