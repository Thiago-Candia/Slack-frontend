import { useCallback, useState } from "react";

const initialState = {
    loading: false,
    error: null,
    data: null
};

const normalizeError = (error) => ({
    message: error.message || "Error inesperado",
    status: error.status
});

export const useApiRequest = (requestFn, options = {}) => {
    const { throwOnError = false } = options;
    const [responseApiState, setResponseApiState] = useState(initialState);

    const execute = useCallback(async (...args) => {
        try {
            setResponseApiState({ ...initialState, loading: true });

            const data = await requestFn(...args);

            setResponseApiState({
                loading: false,
                error: null,
                data
            });

            return data;
        } catch (error) {
            const normalizedError = normalizeError(error);

            setResponseApiState({
                loading: false,
                error: normalizedError,
                data: null
            });

            if (throwOnError) {
                throw normalizedError;
            }

            return null;
        }
    }, [requestFn, throwOnError]);

    return {
        responseApiState,
        execute
    };
};
