import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../../Hooks/UseFetch'
import useForm from '../../Hooks/UseForm'
import { login, register } from '../../services/authService'
import { useNavigate } from 'react-router-dom'
import LOCAL_STORAGE_KEYS from '../../constants/localStorage'
import { LoginContext } from '../../Contexts/LoginContext'
import Spinner from '../../Components/Spinner/Spinner'
import './LoginComponent.css'
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { COMPONENTS } from '../../constants/commonComponents'


export default function LoguinComponent({isRegister}) {

    const { isLoading,url_register,user_data,setUserData} = useContext(LoginContext)
    const navigate = useNavigate()
    

    const FORM_FIELDS =
    {
        EMAIL: 'email',
        EMAIL_PLACEHOLDER:'nombre@work-email.com',
        PASSWORD: 'password',
        NAME:'Nombre'
    }

    const initial_form_state =
    {
        [FORM_FIELDS.EMAIL]: '',
        [FORM_FIELDS.PASSWORD]: ''
    }

    const { sendRequest, loading, response, error } = useFetch()

    const onLogin = (form_state) => {

        sendRequest(() => login(form_state[FORM_FIELDS.EMAIL], form_state[FORM_FIELDS.PASSWORD]))
        
    }
     const onRegister = (form_state) => {
            sendRequest(() => register(form_state[FORM_FIELDS.NAME], form_state[FORM_FIELDS.EMAIL], form_state[FORM_FIELDS.PASSWORD]))
        }

    useEffect(

        () => {
            if (response && response.ok) {
                if(!isRegister){
                    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, response.data.authorization_token)
                    setUserData(response.data)
                    navigate('/home')
                }
                else{
                    navigate(`/confirm/${response.usuario.email || response.email}`)
                }
            }

        }, [response,isRegister]
    )


    const {
  form_state: register_form_state,
  handleSubmit,
  handleInputChange
} = useForm({
  initial_form_state,
  onSubmit: isRegister ? onRegister : onLogin
})


    if (isLoading) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }

    return (
        <div className='login-container'>
            <header className="header-login">
                <div className='header-login-section --section-header-left'>

                </div>
                <div className="header-login-icon">
                    <a href="/home">
                        <img src={COMPONENTS.HEADER_ICON}    
                        alt="Slack Logo"
                        className="login-logo"/>
                    </a>
                </div>
                {
                    !isRegister
                    ?
                    (
                    <div className="header-login-section">
                        <p className='veri_small_text'>
                            ¿Nuevo en Slack?
                        </p>
                        <a className='header-login-create-account'
                            href={url_register}>
                            Crea una cuenta
                        </a>           
                    </div>
                    )
                    :
                    (
                    <div className="header-login-section">         
                    </div>
                    )
                }   

            </header>
            <div className='body-login'>
                <div className="login-title">
                    {
                        !isRegister
                        ?
                        (
                            <div>
                                <h1 className='--max-size'>Escribe tu correo electrónico para conectarte</h1>
                                <h1 className='--litle-size'>Escribe tu correo para conectarte</h1>
                            </div>

                        )
                        :
                        (
                            <div>
                                <h1 className='--max-size'>Completa tus datos para conectarte</h1>
                                <h1 className='--litle-size'>Completa tus datos</h1>
                            </div>

                        )
                    }

                    <div className="login-subtitle">O selecciona otra forma de conectarte.</div>
                </div>
                <br />
                <form onSubmit={handleSubmit} className="login-form">
                     <div className='imputs-containers'>
                            
                            {isRegister
                            ?(
                                <input 
                                placeholder={FORM_FIELDS.NAME}
                                name={FORM_FIELDS.NAME}
                                id={FORM_FIELDS.NAME}
                                onChange={handleInputChange}
                            />
                            )
                            :
                            <></>
                        }
                        <input
                            type="email" placeholder={FORM_FIELDS.EMAIL_PLACEHOLDER}
                            name={FORM_FIELDS.EMAIL}
                            id={FORM_FIELDS.EMAIL}
                            onChange={handleInputChange}
                        />
                        <input
                            autoComplete='off'
                            name={FORM_FIELDS.PASSWORD}
                            id={FORM_FIELDS.PASSWORD}
                            type="password" placeholder="Password"
                            onChange={handleInputChange}
                        /> 
                        {
                            isRegister
                            ?
                            (

                                <div>
                                    <button 
                                        className="login-button"
                                        type="submit" disabled={false}
                                        >Continuar
                                    </button>
                                    
                                 {   
                                 !response
                                    ?
                                    error && <span style={{ color: 'red' }}>{error.message}</span>
                                    :
                                    error && <span style={{ color: 'red' }}>{error.message}</span>
                                 }
                                </div>
                            )
                            :
                            (
                            <div>
                                    {
                                        !response
                                            ? 
                                            <div>
                                                <button 
                                                className="login-button --max-size"
                                                type="submit" disabled={false}
                                                >Conectarse a travéz del correo electrónico
                                                </button>
                                                <button 
                                                className="login-button --litle-size"
                                                type="submit" disabled={false}
                                                >Continuar
                                                </button>
                                            </div>
                                                
                                            :
                                            <>
                                                <button 
                                                    className="login-button"
                                                    type="submit" disabled={true}>Registrarse
                                                </button>
                                            </>
                                    }
                                    {
                                        error && <span style={{ color: 'red' }}>{error.message}</span>

                                    }    
                        </div>

                            )
                        }  
                            
                    </div>   
                </form>
                <footer>
                    <div className='linea-texto-linea'>
                        <div className='linea'></div>
                            <span>O CONÉCTATE CON</span>
                        <div className='linea'></div>
                    </div>

                        <div className="other-connections_container">
                                <button className="other-connections_buttons">
                                    <FcGoogle />
                                    Google
                                </button>

                                <button className="other-connections_buttons">
                                    <FaApple />
                                    Apple
                                </button>

                        </div>

                    <p className='footer-support --max-size'>¿Estás teniendo problemas? <a href="https://slack.com/workspace-signin">
                            Prueba con una URL del espacio de trabajo
                        </a>
                    </p>
                    <p className='footer-support --litle-size'><a href="https://slack.com/workspace-signin">
                            Prueba con una URL del espacio de trabajo
                        </a>
                    </p>
                </footer>
            </div>
        </div>
    )
}