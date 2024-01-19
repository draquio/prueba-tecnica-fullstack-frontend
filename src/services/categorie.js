import { ENV } from "../utils/constants";
export class Categorie {
  baseApi = ENV.BASE_API;
  async getCategories() {
    const url = `${this.baseApi}/${ENV.CATEGORIE_ROUTES.CATEGORIE}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (response.status !== 200) {
        throw result;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}
