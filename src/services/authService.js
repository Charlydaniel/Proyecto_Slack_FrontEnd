import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http"
import ENVIRONMENT from "../config/environment"
import LOCAL_STORAGE_KEYS from "../constants/localStorage"


const USER_URL = {
    GET: '/api/users/get_user/get',
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    VERIFY:'/api/auth/verify-email/'
}

export async function register(name, email, password) {

    const usuario = {
        email,
        name,
        password
    }

    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}${USER_URL.REGISTER}`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            },
            body: JSON.stringify(usuario)
        }
    )
    const response_data = await response_http.json()

    if (!response_data.ok) {
        throw new Error(response_data.message);
    }

    return response_data
}
export async function login(email, password) {

    const usuario = {
        email,
        password
    }


    const response_http = await fetch(
        
        `${ENVIRONMENT.URL_API}${USER_URL.LOGIN}`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            },
            body: JSON.stringify(usuario)
        }
    )
  
    const response_data = await response_http.json()

    if (!response_http.ok) {
        throw new Error(response_data.message || 'Error en la respuesta del servidor')
    }

    return response_data
}
export async function getuser() {

const response_http = await fetch(
    `${ENVIRONMENT.URL_API}${USER_URL.GET}`,
    {
        method: HTTP_METHODS.GET,
        headers: {
            'Authorization': 'Bearer ' +
                localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN),
            [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
        }
    }
)
    const response_data = await response_http.json()
    
    return response_data
}
export async function verifyUser(token) {

        const response_http = await fetch(
                    `${ENVIRONMENT.URL_API}${USER_URL.VERIFY}${token}`,
                    {
                    method: HTTP_METHODS.GET,
                    }
        )
    if (!response_http.ok) {
        const error_data = await response_http.json()
        throw new Error(error_data.message || 'Error al obtener el usuario');
    }

    const response_data = await response_http.json()

    return response_data
}
