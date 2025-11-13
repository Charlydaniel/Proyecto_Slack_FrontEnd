import { useEffect, useState } from "react";
import { COMPONENTS } from "../../constants/commonComponents";
import useFetch from "../../Hooks/UseFetch";
import { verifyUser } from "../../services/authService";
import '../Verify-Email-components/VerifyEmail.css'
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyEmailComponent(){

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
        },[ok]
    )

    return(
        <div className='login-container'>
            <div>
                <header>
                    <div className="header-login">
                        <a href="/home">
                            <img  src={COMPONENTS.HEADER_ICON}    
                            alt="Slack Logo"
                            className="login-logo"/>
                        </a>
                    </div>
                </header>
            </div >
            <span className='login-container-button'>¡Bienvenido {email}, Te hemos enviado un mail de confirmacion!</span>
            <button className="verify-login-button"
            onSubmit={onConfirm}>
                <a className="a-into-button" href="/home">
                    Login
                </a>
            </button>
        </div>
    )
}
