import { toast } from "react-toastify";

const baseOptions = {
  position: "top-right",
  pauseOnFocusLoss: true,
  pauseOnHover: true,
};

export const notifySuccess = (message, options = {}) =>
  toast.success(message, { ...baseOptions, ...options });

export const notifyError = (message, options = {}) =>
  toast.error(message, { ...baseOptions, ...options });

export const notifyInfo = (message, options = {}) =>
  toast.info(message, { ...baseOptions, ...options });
