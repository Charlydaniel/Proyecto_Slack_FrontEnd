import { createContext, useEffect, useState } from "react";


export const CreateWorkspaceContext = createContext()

export default function CreateWorkspaceProvider({children}){

    const[name,setName]=useState('')
    const[members,setMembers]=useState([])
    const[user,setUser]=useState([])
    const[image,setImageUrl]=useState('')
    const[new_workspace,setNewWorkspace]=useState('')


    return(
        <CreateWorkspaceContext.Provider
        value={{new_workspace,name,members,user,image,setImageUrl,setName,setUser,setMembers
            ,setNewWorkspace
        }}
        >
        {children}
        </CreateWorkspaceContext.Provider>
    )
}