import { createContext, useState, useEffect } from "react";
import ENVIRONMENT from "../config/environment";


export const WorkspaceContext = createContext();

const Workspaceprovider = ({ children }) => {


    const [workspace, WpSetWorkspace] = useState([])
    const [channel, WpSetChannel] = useState([])
    const [wpChannels, WpSetWpChannels] = useState([])


    return (
        <WorkspaceContext.Provider 
        value={{workspace,channel,wpChannels, WpSetChannel, WpSetWorkspace,WpSetWpChannels}}>
            {children}
        </WorkspaceContext.Provider>
    )
}
export default Workspaceprovider
