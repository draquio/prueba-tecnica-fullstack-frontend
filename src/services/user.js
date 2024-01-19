import { ENV } from "../utils/constants";

export class User {
    baseApi = ENV.BASE_API;
  async getMe(accessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) {
        throw result;
      } else {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }
}
