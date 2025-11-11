import { useNavigate, useParams } from 'react-router-dom'
import './deleteWorkspace.css'
import { useEffect, useState } from 'react'
import getWorkspace, { deleteWorkspace } from '../../../services/workspaceServices'
import useFetch from '../../../Hooks/UseFetch'
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GiReturnArrow } from "react-icons/gi";
import ErrorMessageComponent from '../../Error-components/ErrorMessageComponent.jsx'
import Spinner from  '../../Spinner/Spinner.jsx'

export default function DeleteWorkspace() {

  const { workspace_id } = useParams()
  const [workspace, setWorkspace] = useState('')
  const [deleted,setDelete] = useState(false)
  const { sendRequest, loading, response, error } = useFetch()
  const navigate = useNavigate()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const id = Number(workspace_id)
        const result = await sendRequest(() => getWorkspace(id))
        if (result.data.workspace) {
          setWorkspace(result.data.workspace)
        }
      } catch (err) {
        console.warn(err);
      }
    }
    fetchData()
  }, [workspace_id])


    const comeBack =()=>{
      navigate('/home')
    }

    const onDelete = async () => {
      try {
        const result = await sendRequest(() => {deleteWorkspace(workspace.id)})
        console.log(result)
        navigate('/home')
      } catch (err) {
        console.warn(err);
      }
    }

if(loading){
  return <Spinner/>
}


  return (

    <div className='delete-workspace-component'>

          {!response
            ?
              (
                <ErrorMessageComponent error={error}/>
              )
            :
            (
              <div className='container-delete-workspace'>
                <h1 className='delete-workspace-titulo'>¿ESTAS SEGURO DE ELIMINAR?</h1>
                <h1 className='delete-nombre-workspace'>{workspace?.nombre}</h1>
                <div className='img-container'>
                  <img src={workspace?.img_workspace} alt="" className='img-workspace' />
                </div>
                <section className='delete-workspace-buttons-section'>
                  <button onClick={onDelete} >
                    <RiDeleteBin6Fill className='delete-button-icons' />
                    Eliminar
                  </button>
                  <button  onClick={comeBack}>
                    <GiReturnArrow className='delete-button-icons' />
                    Volver
                  </button>
                </section>
              </div>
            )
          }
    </div>
  )
}