import { useState } from "react"

//FUNCION DE MANEJO DEL FORMULARIO

export const useForm = (formInitialState) => {

    const [formState, setFormState] = useState(formInitialState)

    const handleChangeInput = (event)=> {

    const {name, value} = event.target

    const file_value = event?.target?.files

    if(file_value && file_value[0] instanceof File) {
        const file = file_value[0]
        const reader = new FileReader()

        reader.onload =  ( ) => {
            setFormState(
                (prevFormState) => {
                    return { ...prevFormState, [name]: reader.result}
                }
            )
        }
        reader.readAsDataURL(file) 
    }

    else{
        setFormState(
            (prevFormState) => {
                return { ...prevFormState, [name]: value}
            }
        )
    }
    }

    return {formState, handleChangeInput}
}