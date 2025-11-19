import { createContext, useState, useEffect } from "react";
import ENVIRONMENT from "../config/environment";


export const WorkspaceContext = createContext();

const Workspaceprovider = ({ children }) => {


    const [workspace, WpSetWorkspace] = useState([])
    const [channel, WpSetChannel] = useState([])
    const [wpChannels, WpSetWpChannels] = useState([])
    const [IsMabileAndOpenNav, SetIsMabileAndOpenNav] = useState(false)


    return (
        <WorkspaceContext.Provider 
        value={{IsMabileAndOpenNav,workspace,channel,wpChannels, WpSetChannel, WpSetWorkspace,WpSetWpChannels,SetIsMabileAndOpenNav}}>
            {children}
        </WorkspaceContext.Provider>
    )
}
export default Workspaceprovider
