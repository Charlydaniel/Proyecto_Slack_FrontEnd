
import { useState } from "react"

const useForm = ({initial_form_state,onSubmit,button_status}) => {

    const [form_state, setFormState] = useState(initial_form_state)
    const [disabledButton,setDisabledButton]=useState(button_status)

    const handleInputChange = (event) => {
        setFormState(
            (current_form_state) => {
                const field_name = event.target.name
                const field_value = event.target.value
                return { ...current_form_state, [field_name]: field_value }
            }
        )
        if(event.target.value.length >0){
            setDisabledButton(false)
        }
    }

    const handleSubmit = (event) => {
        //Evita el comportamiento predeterminado del navegador
        //Bloquear el submit tradicional del navegador (que recargaría la página).
        event.preventDefault()
        onSubmit(form_state)
    }
    
    return {
        disabledButton,
        form_state,
        handleInputChange,
        handleSubmit
    }
}
export default useForm