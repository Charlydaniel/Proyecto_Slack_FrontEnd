import { useContext } from "react"
import { CreateWorkspaceContext } from "../../Contexts/CreateWorkspaceContext"
import { WorkspaceContext } from "../../Contexts/WorkspaceContext"
import { BsBackpack } from "react-icons/bs"
import './channel-component.css'
import { IoIosStarOutline } from "react-icons/io";



export default function ChatComponent(){

 const {workspace,channel, WpSetChannel, WpSetWorkspace}=useContext(WorkspaceContext)

 console.log('esto llega:',channel)

    return(
        <div className="chat-section-body">
            <header className="chat-header">
                <aside className="chat-header-left">
                    <button className="chat-header-button --extra-short">
                        <IoIosStarOutline className="chat-header-favorite"/>
                    </button>
                    <h1 className="chat-header-channel">
                        {channel}
                    </h1>
                </aside>
                <aside className="chat-header-right">
                    <div>
                        <button className="chat-header-button --long">
                            <span className="chat-header-button-span">Invita a compañeros de equipo</span>
                        </button>
                    </div>
                    <div>
                        
                        <span className="chat-header-button-span">Invita a compañeros de equipo</span>
                    </div>
                    <button className="chat-header-button --short">

                    </button>
                    <button className="chat-header-button --extra-short">

                    </button>
                </aside>

            </header>

        </div>
    )
}