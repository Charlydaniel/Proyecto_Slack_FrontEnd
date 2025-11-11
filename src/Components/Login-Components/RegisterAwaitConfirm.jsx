import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ErrorComponent from "../Error-components/ErrorComponent";
import './RegisterAwaitConfirm.css'


export default function RegisterAwaitConfirm(){


    const [ok, SetOk] = useState(false);
    const navigate=useNavigate()
    const error_page={message: 'Pagina no disponible'}
    const {email}= useParams()

    const onConfirm = (e)=>{
        e.preventDefault()
        SetOk(true)
    }

    useEffect(
        ()=>{
            if(ok){
                navigate('/login')
            }
        },[ok,navigate]
    )

    return(
        <div className="await-confirm-container">
                {
                    email
                    ?
                    (
                        <form onSubmit={onConfirm}>
                        <p> Bienvenido {email} , te hemos enviado un correo de confirmacion</p>   
                            <button type="submit">Go to login</button>
                        </form>
                    )
                    :
                    (
                        <div>
                            <ErrorComponent error={ error_page}/>
                        </div>
                    )
                }
        </div>
    )

}