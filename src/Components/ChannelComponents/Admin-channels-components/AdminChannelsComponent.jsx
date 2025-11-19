import { useContext, useEffect, useState } from 'react'
import './admin-channels.css'
import useFetch from '../../../Hooks/UseFetch';
import getWorkspace from '../../../services/workspaceServices';
import Spinner from '../../Spinner/Spinner';
import { useParams } from 'react-router-dom';
import { getChanelsList, updateChanel } from '../../../services/ChannelService';
import { COMPONENTS } from '../../../constants/commonComponents.js'
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiGoogleforms } from "react-icons/si";
import { FaCheck } from "react-icons/fa6";
import { TbCancel } from "react-icons/tb";
import useForm from '../../../Hooks/UseForm.jsx';


    const FORM_FIELDS =
    {
        NAME:'Nombre'
    }

    const initial_form_state =
    {
        [FORM_FIELDS.NAME]: '',
    }


const AdminChannelComponent = () => {

    const [openChannels, setOpenChannels] = useState(false)
    const {sendRequest, loading, response, error } = useFetch()
    const [workspace, setWorkspace] = useState(null)
    const [selectedChannel, setSelectedChannel] = useState({ name: 'Selecciona el canal', id: null })
    const [channels, SetChannels] = useState([])
    const {workspace_id} = useParams()
    const [modify,setModify]=useState(false)
    const [deleteOk,setDeleteOk]=useState(false)
    const [updated,setUpdated]=useState(false)
    const [Deleted,setDeleted]=useState(false)
    
    const onOpenItem = () => {
        setOpenChannels(!openChannels)
    }

    
    const handleSelectedChannel = (name,id) => {

        setSelectedChannel({ name:name , id:id })
        setOpenChannels(false)

    }
     const onUpdate = async (form_state) => {
            
            const result = await sendRequest(() => updateChanel(
                                                                workspace_id,selectedChannel.id,
                                                                {nombre:form_state[FORM_FIELDS.NAME]}
                                                                ))    
            
            if (result){
                setUpdated(prev => !prev)
                setModify(false)
                setSelectedChannel({ name: 'Selecciona el canal', id: null })
            }                                                    
    }
    
    const onDelete = async () => {

        const result= await sendRequest(() => updateChanel(workspace_id,selectedChannel.id,{activo:0}))
                    
            if (result){
                setUpdated(prev => !prev)
                setModify(false)
                setSelectedChannel({ name: 'Selecciona el canal', id: null })
                setDeleted(true)
            }
    }

    
const {
  form_state: register_form_state,
  handleSubmit,
  handleInputChange
} = useForm({
  initial_form_state,
  onSubmit: modify ? onUpdate : onDelete
})

    useEffect(

        () => {
            const fetchData = async () => {

                const result = await sendRequest(() => getWorkspace(workspace_id))
                const channels = await sendRequest(() => getChanelsList(workspace_id))

                if (result) {
                    setWorkspace(result.data.workspace)
                }
                else {
                    throw new Error('Fetch Workspace Error')
                }
                if (channels) {
                    SetChannels(channels.data)
                }
                else {
                    throw new Error('Fetch Channels Error')
                }
            }
            fetchData()

        }, [updated]
    )

    if (loading) {
        return <Spinner />
    }


    return (

        <div className="body-admin-channel">

            <div className='admin-channel-container'>
                <div className='admin-channel-slack-icon-container'>
                    <img src={COMPONENTS.HEADER_ICON} alt="slack Icon"
                        className='admin-channe-slack-icon' />
                </div>
                <div className='titles-container'>
                    <h1 className='admin-channel-title-admin-channel'> Administrar canales de</h1>
                    <h2 className='subtitle-admin-channel'>{workspace?.nombre}</h2>
                </div>

                <div className='admin-channel-data-container'>

                    <button className="admin-channel-dropdown-btn"
                        onClick={onOpenItem}>
                        {
                            !openChannels
                                ?
                                <div>► {selectedChannel.name}</div>
                                :
                                <div> ▼ Selecciona el canal</div>
                        }
                    </button>
                    {openChannels &&
                        (
                            <ul className='admin-channel-dropdown-list'>
                                {
                                    channels.length > 0
                                        ?
                                        (
                                            channels.map(
                                                (ch) =>
                                                (
                                                    <li className='admin-canales-canales-li'
                                                        onClick={() => handleSelectedChannel(ch.nombre, ch.id)}
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
                    {
                        selectedChannel.id && !openChannels
                        &&
                        (
                        <div className="admin-channel-options">
                            <div className='admin-channel-buttons'>
                                <button 
                                onClick={()=>setDeleteOk(true)}>
                                    Eliminar
                                    <RiDeleteBin6Line />
                                </button>
                                <button  
                                type="submit"
                                onClick={()=>setModify(true)} >
                                    Renombrar
                                    <SiGoogleforms />
                                </button>
                            </div>
                        </div>
                        )
                    }
                </div>
                <form action="modify"
                    onSubmit={handleSubmit} 
                    className='admin-channel-modify-form'>
                {
                    modify
                    &&
                    !deleteOk
                    &&
                        (

                                <div className='admin-channel-modify-container'>
                                        <input type="text"
                                            placeholder={FORM_FIELDS.NAME}
                                            name={FORM_FIELDS.NAME}
                                            id={FORM_FIELDS.NAME}
                                            onChange={handleInputChange}/>
                                        <div className='admin-channel-modify-buttons-container'>
                                            <button 
                                            className='admin-channel-rename-button --green'
                                            type='submit'
                                            >
                                                <FaCheck />
                                            </button>
                                            <button 
                                            className='admin-channel-rename-button --red'
                                            onClick={()=>setModify(false)}
                                            >
                                                <TbCancel />
                                            </button>    
                                        </div>                           
                                </div>

                        )                          
                }
                {
                    deleteOk 
                    && selectedChannel.id
                            &&
                            (
                                <div className='admin-channel-delete-form-container'>
                                    <span>¿Estas seguro de eliminar {selectedChannel.nombre} ?</span>
                                    <div className='admin-channel-delete-form-buttons'>
                                        <button className='admin-channel-rename-button --green'
                                        type='submit'>
                                            <FaCheck />
                                        </button>
                                        <button 
                                        className='admin-channel-rename-button --red'
                                        onClick={()=>setDeleteOk(false)}>
                                            <TbCancel />
                                        </button>
                                    </div>
                                </div>
                            )
                }
                {
                    Deleted
                    ?
                    !selectedChannel.id 
                    && <span> Canal eliminado</span>
                    :
                    <div>
                    </div>
                }
                {
                    !response
                    ? 
                    error && <span style={{color:'red'}}>{error.message}</span> 
                    :
                    <div>

                    </div>             
                }
            </form>
            </div>

        </div>
    )


}
export default AdminChannelComponent