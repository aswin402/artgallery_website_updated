import axios from "axios";
import { logger } from "@/lib/logger";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  logger.info(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    logger.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);