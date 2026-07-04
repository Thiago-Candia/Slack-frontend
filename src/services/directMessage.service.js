import { api } from "./httpClient.js";

export const directMessageService = {
    getByUser: (userId) => api.get(`/api/dm/${userId}`),
    send: (userId, content) => api.post(`/api/dm/${userId}`, { content })
};
