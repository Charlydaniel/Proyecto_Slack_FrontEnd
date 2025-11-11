import { useState } from "react"

/*Gestion interna de los fetch de mi aplcacion */
const useFetch = () => {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)

    async function sendRequest(requestCallback) {

        try {
            //Marcamos que estamos cargando
            setLoading(true)
            //Limpiamos el error por si se invoca mas de una vez el send request para que no quede con el error anterior
            setError(null)
            //Ejecutamos la consulta http
            const response = await requestCallback()
            //Seteamos el estado de respuesta 
            setResponse(response)
            
            return response
        }
        catch (error) {
            //Si hay fallo seteamos el error
            setError(error)
        }
        finally {
            //Aunque se ejecute o salga por error hacemos que se deje de cargar siempre
            setLoading(false)
        }

    }

    return {
        sendRequest,
        loading,
        response,
        error
    }
}
export default useFetch