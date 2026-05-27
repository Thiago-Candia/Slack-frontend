import React, { useState } from "react";
import { ServerError } from "../utils/error.utils.js";

export const useApiRequest = (url) => {

    const initialResponseApiState = {
        loading: false,
        error: null,
        data: null
    };


    const [responseApiState, setResponseApiState] = useState(initialResponseApiState);

    // Método POST para enviar datos
    const postRequest = async (body, token) => {
        try {
            setResponseApiState({ ...initialResponseApiState, loading: true });
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (data.ok) {
                setResponseApiState((prevState) => ({ ...prevState, data: data}))
                return data
            } 
            else {
                throw new ServerError(data.message, data.status);
            }
        } 
        catch (error) {
            setResponseApiState((prevState) => ({
                ...prevState,
                error: error.status ? error.message : 'No se pudo enviar la información al servidor'
            }))
        } 
        finally {
            setResponseApiState((prevState) => ({ ...prevState, loading: false }))
        }
    }

    // Método PUT para actualizar datos
    const putRequest = async (config) => {
        try {
            setResponseApiState({ ...initialResponseApiState, loading: true })

            const response = await fetch(url, {
                method: 'PUT',
                headers: config.headers || {
                    'Content-Type': 'application/json'
                },
                body: typeof config.body === 'string' ? config.body : JSON.stringify(config.body)
            })

            const data = await response.json()

            if (data.ok) {
                setResponseApiState((prevState) => ({ ...prevState, data: data }))
                return data
            } 
            else {
                throw new ServerError(data.message, data.status)
            }
        } 
        catch (error) {
            setResponseApiState((prevState) => ({
                ...prevState,
                error: error.status ? error.message : 'No se pudo enviar la información al servidor'
            }))
            throw error
        } 
        finally {
            setResponseApiState((prevState) => ({ ...prevState, loading: false }));
        }
    }

    // Método GET para obtener datos
    const getRequest = async () => {
        try {
            setResponseApiState({ ...initialResponseApiState, loading: true });
            const token = localStorage.getItem('authorization_token')
            const response = await fetch(url, {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                }
            })
            const data = await response.json();
            if (data.ok) {
                setResponseApiState({ data, loading: false, error: null });
            } else {
                throw new ServerError(data.message, data.status);
            }
        } 
        catch (error) {
            setResponseApiState((prevState) => ({
                ...prevState,
                error: error.status ? error.message : "No se pudo obtener la información del servidor"
            }));
        } 
        finally {
            setResponseApiState((prevState) => ({ ...prevState, loading: false }));
        }
    }

    return { responseApiState, postRequest, putRequest, getRequest }
}