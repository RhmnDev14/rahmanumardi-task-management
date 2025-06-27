const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API = {
  auth: {
    login: `${BASE_URL}/login`,
    register: `${BASE_URL}/register`,
    forgot: `${BASE_URL}/forgot`,
  },
};
