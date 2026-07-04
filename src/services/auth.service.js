import { api } from "./httpClient.js";

export const authService = {
    login: (credentials) => api.post("/api/auth/login", credentials, { auth: false }),
    register: (credentials) => api.post("/api/auth/register", credentials, { auth: false }),
    resetPassword: (credentials) => api.post("/api/auth/reset-password", credentials, { auth: false }),
    rewritePassword: (credentials) => api.put("/api/auth/rewrite-password", credentials, { auth: false })
};

