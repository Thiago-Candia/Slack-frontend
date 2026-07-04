import ENVIROMENT from "../config/enviroment";
import { ServerError } from "../utils/error.utils.js";

export const AUTH_TOKEN_KEY = "authorization_token";

const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

const buildUrl = (path) => `${ENVIROMENT.URL_API}${path}`;

const parseResponseBody = async (response) => {
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        return response.json();
    }

    const text = await response.text();
    return text ? { message: text } : {};
};

export const httpClient = async (path, options = {}) => {
    const {
        method = "GET",
        body,
        auth = true,
        headers = {}
    } = options;

    const token = getToken();
    const hasBody = body !== undefined && body !== null;

    const requestHeaders = {
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
        ...headers
    };

    if (auth && token) {
        requestHeaders.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(buildUrl(path), {
        method,
        headers: requestHeaders,
        body: hasBody ? JSON.stringify(body) : undefined
    });

    const data = await parseResponseBody(response);

    if (!response.ok || data.ok === false) {
        throw new ServerError(
            data.message || "Error inesperado del servidor",
            data.status || response.status
        );
    }

    return data;
};

export const api = {
    get: (path, options) => httpClient(path, { ...options, method: "GET" }),
    post: (path, body, options) => httpClient(path, { ...options, body, method: "POST" }),
    put: (path, body, options) => httpClient(path, { ...options, body, method: "PUT" })
};
