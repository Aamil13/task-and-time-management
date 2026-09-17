import toast from "react-hot-toast";

export const getErrorMessage = (error: any): string => {
  // Network error (no response from server)
  if (!error.response && error.message) {
    if (error.message.includes("Network Error")) {
      return "Network error. Please check your connection.";
    }
    if (error.code === "ECONNREFUSED") {
      return "Unable to connect to server. Please check if the server is running.";
    }
    return error.message;
  }

  // HTTP error responses
  if (error?.response) {
    const status = error.response.status;
    const data = error.response.data;

    // 404 - Not Found
    if (status === 404) {
      return "Resource not found. Please check the API endpoint.";
    }

    // 401 - Unauthorized
    if (status === 401) {
      return "Unauthorized. Please log in again.";
    }

    // 500 - Server Error
    if (status >= 500) {
      return "Server error. Please try again later.";
    }

    // API error message
    if (data?.message) {
      return data.message;
    }

    // Validation errors
    if (data?.errors) {
      const errors = data.errors;
      const firstError = Object.values(errors)[0] as string;
      return firstError || "Validation error";
    }
  }

  // Fallback
  if (error?.message) {
    return error.message;
  }

  return "An unexpected error occurred";
};

export const useCustomToast = () => {
  const showPromise = <T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ): Promise<T> => {
    return toast.promise(promise, {
      loading: options.loading,
      success: (data) => {
        return typeof options.success === "function"
          ? options.success(data)
          : options.success;
      },
      error: (error) => {
        return typeof options.error === "function"
          ? options.error(error)
          : options.error;
      },
    });
  };

  return { showPromise };
};
