import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= INVENTORY ================= */

export const getInventoryAPI = () =>
  API.get("/inventory");

export const addInventoryAPI = (data) =>
  API.post("/inventory", data);

export const updateInventoryAPI = (id, data) =>
  API.put(`/inventory/${id}`, data);

/* ================= JOB CARDS ================= */

export const getJobCardsAPI = () =>
  API.get("/jobcards");

export const createJobCardAPI = (data) =>
  API.post("/jobcards", data);

export const closeJobCardAPI = (id) =>
  API.put(`/jobcards/close/${id}`);

export const reopenJobCardAPI = (id) =>
  API.put(`/jobcards/reopen/${id}`);

export const updateJobCardAPI = (id, data) =>
  API.put(`/jobcards/edit/${id}`, data);

export const getDashboardAPI = () =>
  API.get("/dashboard");

export default API;

/* ================= DASHBOARD ================= */

