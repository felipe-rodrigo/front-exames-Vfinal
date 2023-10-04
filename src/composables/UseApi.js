import { api } from "boot/axios";

export default function UseApi(url) {
  const list = async () => {
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  // form = dados recebidos do front
  const post = async (form) => {
    try {
      const { data } = await api.post(url, form);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };
  const update = async (form) => {
    try {
      const { data } = await api.put(`${url}`, form);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };
  const remove = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };
  const getById = async (id) => {
    try {
      const { data } = await api.get(`${url}/${id}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    list,
    getById,
    post,
    update,
    remove,
  };
}
