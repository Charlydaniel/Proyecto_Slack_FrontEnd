import React, { useState } from 'react'
import useForm from '../../Hooks/UseForm'
import { register } from '../../services/authService'
import useFetch from '../../Hooks/UseFetch'

export const RegisterScreen_old = () => {


    const FORM_FIELDS = {
        NAME: 'name',
        EMAIL: 'email',
        PASSWORD: 'password'
    }
    const initial_form_state = {
        [FORM_FIELDS.NAME]: '',
        [FORM_FIELDS.EMAIL]: '',
        [FORM_FIELDS.PASSWORD]: ''
    }

    const { sendRequest, loading, response, error } = useFetch()

    const onRegister = (form_state) => {
        //console.log(form_state)
        sendRequest(() => register(form_state[FORM_FIELDS.NAME], form_state[FORM_FIELDS.EMAIL], form_state[FORM_FIELDS.PASSWORD]))
    }

    const {
        form_state: register_form_state,
        handleSubmit,
        handleInputChange
    } = useForm(
        {
            initial_form_state,
            onSubmit: onRegister
        }
    )


    return (
        <div>
            <h1>Registrate</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor={FORM_FIELDS.NAME} >Nombre</label>
                    <input
                        name={FORM_FIELDS.NAME}
                        id={FORM_FIELDS.NAME}
                        type="text"
                        onChange={handleInputChange}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor={FORM_FIELDS.EMAIL} >Email:</label>
                    <input
                        name={FORM_FIELDS.EMAIL}
                        id={FORM_FIELDS.EMAIL}
                        type="text"
                        onChange={handleInputChange}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor={FORM_FIELDS.PASSWORD} >Password:</label>
                    <input
                        name={FORM_FIELDS.PASSWORD}
                        id={FORM_FIELDS.PASSWORD}
                        type="password"
                        onChange={handleInputChange}
                    />
                </div>
                <br />
                {
                    !response
                        ? <button type="submit" disabled={false}>Registrarse</button>
                        :
                        <>
                            <button type="submit" disabled={true}>Registrarse</button>
                            <span style={{ color: 'green' }}>{response.message}</span>
                        </>
                }
                {
                    error && <span style={{ color: 'red' }}>{error.message}</span>

                }
            </form>
        </div>
    )
}

