import ENVIRONMENT from "../config/environment"
import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http"
import LOCAL_STORAGE_KEYS from "../constants/localStorage"

const CHANNEL_URL={
    GET_CHANNEl:''

}

export const getChanelsList = async (user_id) => {

    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}${CHANNEL_URL.GET_CHANNEl}`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
                'Authorization': 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
            },
            body: JSON.stringify(user_id)
        }
    )
    const response_data = await response_http.json()

    if (!response_http.ok) {
        throw new Error(response_data.message || "Error en el servicio de Workspaces")
    }
    return response_data
}