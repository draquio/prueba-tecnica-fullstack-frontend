import { ENV } from "../utils/constants";
export class Note {
  baseApi = ENV.BASE_API;
  async CreateNote(accessToken, note) {
    try {
      const url = `${this.baseApi}/${ENV.NOTE_ROUTES.CREATE}`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(note),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) {
        throw result;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getNotes(active) {
    try {
      let url = ""
      if (active) {
        url = `${this.baseApi}/${ENV.NOTE_ROUTES.NOTE}?active=${active}`;
      }else{
        url = `${this.baseApi}/${ENV.NOTE_ROUTES.NOTE}`;
      }
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

  async getSingleNote(accessToken, id) {
    try {
      const url = `${this.baseApi}/${ENV.NOTE_ROUTES.SINGLENOTE}/${id}`;
      const params = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        }
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) {
        throw result;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getMyNotes(accessToken, user_id, active) {
    try {
      let url = `${this.baseApi}/${ENV.NOTE_ROUTES.MYNOTE}?user_id=${user_id}&active=${active}`;;
      const params = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        }
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) {
        throw result;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }


  async updateNote(accessToken, id, data) {
    try {
      const url = `${this.baseApi}/${ENV.NOTE_ROUTES.UPDATE}/${id}`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
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

  async deleteNote(accessToken, id){
    try {
      const url = `${this.baseApi}/${ENV.NOTE_ROUTES.DELETE}/${id}`;
      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) {
        throw result
      } else {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }
}
