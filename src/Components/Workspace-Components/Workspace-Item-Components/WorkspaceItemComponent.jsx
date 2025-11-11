

import { useEffect, useState,react } from 'react';
import { getMembers } from '../../../services/memberServices';
import './WorkspaceItem.css' 
import ErrorComponent from '../../Error-components/ErrorComponent';
import useFetch from '../../../Hooks/UseFetch';
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';




export default function WorkspaceItem({nombre,imagen,id,filtrados}){

    const {loading, response, error, sendRequest } = useFetch();
    const [members,setMembersTeam]=useState([])
    const [gotoNext,setGoTo]=useState(false)

    const navigate=useNavigate()


    const getInitials = (nombre) => {
        if (!nombre) return "";
        const words = nombre.trim().split(" ")
        const initials = words.slice(0, 2).map(w => w[0]?.toUpperCase()).join("")
        return initials
    }

    const onSelectWorkspaces = ()=>{
        setGoTo(true)
    }
    
    useEffect(()=>{
        if(gotoNext){
                    if(id>0){
                        navigate('/api/workspaces/'+id)
                    }
                    else{
                        navigate('/api/workspaces/create/workspace/1')
                    }
                    }},
                [gotoNext]
            )

  useEffect(()=>{

          try{
                 setMembersTeam(filtrados)
                
              }
          catch(err){
          }

      },[filtrados]) 


  if(error){
    <ErrorComponent error={error}/>
  }

    if (loading) {
    return <Spinner />;
  }
  

    return(
        
        <div className='workspace-item-container'>
            
            <div className="workspace-item-text">
                {
                    imagen?
                    (<img className="workspace-item-image" src={imagen} alt={nombre}/>)
                    :
                    (
                    <div className="workspace-item-char">
                        {getInitials(nombre)}
                    </div>
                    )
                }
                <div className='workspace-item-right'>
                    <p className="workspace-item-name">{nombre}</p>
                    <div className='workspace-members'>
                    <div className='workspaces-members-imgs'>
                        {
                          members?.length > 0 
                          ?
        

                            members.map((members, clave) => (
                            <img 
                                key={clave} 
                                className="workspace-members-img" 
                                src={members.imagen} 
                                alt={members.usuario_nombre || "Miembro"} 
                            />
                            ))
                            

                          :
                          <></>
                          }
                          {
                            id === 0 ? (
                                <div className='workspace-members-cant'> Crea un nuevo workspace</div>
                            ) 
                            : members?.length !== 1 ? (
                                <p className='workspace-members-cant'>{members.length} miembros</p>
                            ) 
                            : (
                                <p className='workspace-members-cant'>{members?.length} miembro</p>
                            )
                          }

                    </div>
                    </div>
                </div>
                <div onClick={onSelectWorkspaces} className='workspace-goto'>
                    <span className='workspace-goto-lavel'>Abrir</span>
                    <FaArrowRightLong />
                </div>
            </div>
            <div className='line-container'>
                    <hr className='h-line'/>
            </div>
        </div>

    )
}