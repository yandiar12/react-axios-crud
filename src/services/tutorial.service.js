/* eslint-disable import/no-anonymous-default-export */
import http from "../http-common";

const getAll = () => {
  return http.get("/tutorials")
}

const get = (id) => {
  return http.get(`/tutorials/${id}`)
}

const create = (data) => {
  return http.post("/tutorials", data)
}

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data)
}

const deleteById = (id) => {
  return http.delete(`/tutorials/${id}`)
}

const deleteAll = () => {
  return http.delete(`/tutorials`);
}

const findByTitle = (title) => {
  return http.get(`/tutorials?title=${title}`)
}

export default {
  getAll,
  get,
  create,
  update,
  deleteById,
  deleteAll,
  findByTitle
}