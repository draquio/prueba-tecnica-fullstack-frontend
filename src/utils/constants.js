
const SERVER_IP = "fullstack-backend-draquio.vercel.app";

export const ENV = {
  BASE_PATH: `https://${SERVER_IP}`,
  BASE_API: `https://${SERVER_IP}/api/v1`,
  API_ROUTES: {
    LOGIN: "auth/login",
    USER_ME: "user/me",
    REFRESH_ACCESS_TOKEN: "auth/refresh_access_token",
  },
  NOTE_ROUTES: {
    CREATE: "note",
    NOTE: "note",
    MYNOTE: "mynote",
    SINGLENOTE: "singlenote",
    UPDATE: "note",
    DELETE: "note",
  },
  CATEGORIE_ROUTES:{
    CATEGORIE: "categorie",
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
};
