import { toast } from "react-hot-toast";

const showSuccessToast = (message) => toast.success(message);
const showErrorToast = (message) => toast.error(message);
const showInfoToast = (message) => toast(message, { icon: "ℹ️" });

export {showSuccessToast, showErrorToast, showInfoToast};