import { api } from "./httpClient.js";

export const profileService = {
    get: () => api.get("/api/profile"),
    update: (profileData) => api.put("/api/profile", profileData)
};
