import { useEffect, useState } from "react";
import { COMPONENTS } from "../../constants/commonComponents";
import useFetch from "../../Hooks/UseFetch";
import { verifyUser } from "../../services/authService";
import './VerifyEmail.css'
import { useParams } from "react-router-dom";

export default function VerifyEmailComponent(){

    const { loading, response, error, sendRequest } = useFetch();
    const [initialLoading, setInitialLoading] = useState(true);
    const {token}=useParams()


    useEffect(
                () => {
                        const fethcData=async()=>
                        {
                            await sendRequest(() => verifyUser(token));
                            setInitialLoading(false)

                        }
                        fethcData()
                            
                        }, []
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
            <div className='login-container-button'>Gracias !,ya podemos comenzar {response?.user_name}</div>
            <button className="verify-login-button">
                <a className="a-into-button" href="/home">
                    Iniciar sesión
                </a>
            </button>
        </div>
    )
}
