import ENVIRONMENT from "../config/environment";
import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http";
import LOCAL_STORAGE_KEYS from "../constants/localStorage";

const WORKSPACE_URL = {
    GET: '/api/workspaces/',
    GET_BY_MEMBERS: '/api/workspace_member/get_by_member/get_workspaces',
    CREATE_WORKSPACE: '/api/workspaces/new_workspace',
    DELETE: '/api/workspaces/delete/'
}

export async function CreateWorkspace(name, image) {

    const workspace = {
        name,
        image
    }

    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}${WORKSPACE_URL.CREATE_WORKSPACE}`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
                'Authorization': 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
            },
            body: JSON.stringify(workspace)
        }
    )

    const response_data = await response_http.json()
    if (!response_data.ok) {
        throw new Error(response_data.message)
    }
    console.log(response_data)
    return response_data
}
export const getWorkspaceList = async () => {

    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}${WORKSPACE_URL.GET_BY_MEMBERS}`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
                'Authorization': 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
            }
        }
    )
    const response_data = await response_http.json()

    console.log('WP DATA: ', response_data)
    if (!response_http.ok) {
        throw new Error(response_data.message || "Error en el servicio de Workspaces")
    }
    return response_data
}
export default async function getWorkspace(workspace_id) {

    const response_http = await fetch(

        `${ENVIRONMENT.URL_API}${WORKSPACE_URL.GET}${workspace_id}`,
        {
            method: HTTP_METHODS.GET,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
                'Authorization': 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
            }
        }
    )
    const response_data = await response_http.json()

    if (!response_http.ok) {
        throw new Error(response_data.message || 'Error al buscar el workspace')

    }

    return response_data
}
export async function deleteWorkspace(workspace_id) {

    const response_http = await fetch(

        `${ENVIRONMENT.URL_API}${WORKSPACE_URL.DELETE}${workspace_id}`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
                'Authorization': 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
            }
        }
    )
    const response_data = await response_http.json()

    console.log(response_data)
    if (!response_http.ok) {
        throw new Error(response_data.message || 'Error al eliminar el workspace')

    }

    return response_data

}
