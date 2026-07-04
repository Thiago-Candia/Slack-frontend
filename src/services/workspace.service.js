import { api } from "./httpClient.js";

export const workspaceService = {
    getAll: () => api.get("/api/workspaces"),
    create: (name) => api.post("/api/workspaces", { name }),
    generateInvite: (workspaceId) => api.post(`/api/workspaces/${workspaceId}/generate-invite`, {}),
    join: (inviteToken) => api.post(`/api/workspaces/join/${inviteToken}`, {})
};
