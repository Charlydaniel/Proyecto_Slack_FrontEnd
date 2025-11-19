import ENVIRONMENT from "../config/environment"
import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http"
import LOCAL_STORAGE_KEYS from "../constants/localStorage"

const CHANNEL_URL={
    GET_CHANNEl:'/api/channels/get_channel_by_workspace/',
    UPDATE_CHANNEL:'/api/channels/upd_channel/'
}



export const getChanelsList = async (workspace_id) => {


const response_http = await fetch(

    `${ENVIRONMENT.URL_API}${CHANNEL_URL.GET_CHANNEl}${workspace_id}`,
    {
        method: HTTP_METHODS.POST,
        headers: {
            'Authorization': 'Bearer ' +
                localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN),
            [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
        },
         body: ''
    }
)
    const response_data = await response_http.json()
 
    return response_data
}

export const updateChanel = async (workspace_id,channel_id,update_data) => {

    
const response_http = await fetch(

    `${ENVIRONMENT.URL_API}${CHANNEL_URL.UPDATE_CHANNEL}${workspace_id}`,
    {
        method: HTTP_METHODS.POST,
        headers: {
            'Authorization': 'Bearer ' +
                localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN),
            [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
        },
         body:JSON.stringify({channel_id,update_data})
    }
)
    const response_data = await response_http.json()
 console.log(response_data )
    return response_data
}