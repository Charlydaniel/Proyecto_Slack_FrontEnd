import { useEffect, useState } from "react"
import useFetch from "../../../Hooks/UseFetch"
import { getWorkspaceList } from "../../../services/workspaceServices"
import WorkspaceItem from "../Workspace-Item-Components/WorkspaceItemComponent"
import "./WorkspaceList.css"
import ErrorComponent from "../../Error-components/ErrorComponent"
import Spinner from "../../Spinner/Spinner"
import { getMembersOfMyWorkspaces } from "../../../services/memberServices"


export default function WorkspaceListComponent() {

  const { loading, response, error, sendRequest } = useFetch()
  const [workspaces, setWorkspaces] = useState([])
  const [members, setMembers] = useState([])


  useEffect(
      () => {
      const fetchMembers = async () => {
        try {
          const result = await sendRequest(()=>getMembersOfMyWorkspaces())

          if (!result || !result?.data ||[]) {
              const data = result?.data || []
              setMembers(data)
          }
        } catch (err) {
          console.log('Error Fetch', err)
        }
      }
      fetchMembers()
    }, []
  )

    useEffect(
    () => {

      const fetchData = async () => {
        try {
          const result = await sendRequest(() => getWorkspaceList())

          if (!result || !result.data) {
            setWorkspaces([])
          }
          else {
            setWorkspaces(result.data)
          }
        }
        catch (err) {

          setWorkspaces([])
        }
      }
      fetchData()
    }, []
  )


  if (loading) {
    return <Spinner />
  }

  if (error) {
    <ErrorComponent />
  }

console.log("WORKSPACES:", workspaces)
console.log("MEMBERS:", members)

  return (
          <div className="Workspace-list-body">
            <ul className="workspace-list">
              {
                workspaces.length > 0 ?
                  (
                    workspaces.map((workspace, clave) =>
                    (
                      <div className="workspace" key={clave}>
                        <WorkspaceItem
                          nombre={workspace.nombre}
                          imagen={workspace.img_workspace}
                          id={workspace.fk_id_workspace} 
                          filtrados={members.filter(m => m.workspace_id 
                                      === workspace.fk_id_workspace)}
                         /> 
                      </div>

                    )
                    )
                  )
                  :
                  (
                    <p>No hay workspaces disponibles.</p>
                  )}
              <WorkspaceItem
                nombre='Nuevo Workspace'
                imagen=''
                id={0}
              />
            </ul>
          </div>
  )
}
