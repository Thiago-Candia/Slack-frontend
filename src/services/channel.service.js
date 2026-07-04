import { api } from "./httpClient.js";

export const channelService = {
    getByWorkspace: (workspaceId) => api.get(`/api/channels/${workspaceId}/channels`),
    create: (workspaceId, name) => api.post(`/api/channels/${workspaceId}`, { name }),
    getMessages: (channelId) => api.get(`/api/channels/${channelId}/messages`),
    sendMessage: (channelId, content) => api.post(`/api/channels/${channelId}/messages`, { content })
};
