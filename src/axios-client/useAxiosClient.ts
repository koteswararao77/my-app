import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants/constant";
// import { handelLogout } from "../reducers/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRef } from "react";
import { getCurrentDateTime } from "../time-date";


const useAxiosClient = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  /** Setting common axios header  */
  const traderId = "1";
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });
  /** Setting common axios header  */
  const clientID = localStorage.getItem("clientId") || "";
  const clientSecret = localStorage.getItem("clientSecret") || "";

  axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
  axiosInstance.defaults.headers.common["client-id"] = clientID;
  axiosInstance.defaults.headers.common["client-secret"] = clientSecret;
  const navigate = useNavigate();
  /** Function to attach click id in URL */
  const handleCreateURL = (_url = "") => {
    let newURL = _url;
    if (_url.includes(":traderId")) {
      newURL = _url.replace(":traderId", traderId);
      return newURL;
    }

    if (_url.includes(":traderId")) {
      newURL = _url.replace(":traderId", traderId);
    }

    return newURL;
  };
  const handleLogoutFun = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
    localStorage.clear();
    // dispatch(handelLogout(null));
    navigate("/");
    window.location.reload();
    //@ts-ignore
    // oNoLocalStorage.set("LinkPath", "/smartboard", false);
    // //@ts-ignore
    // oNoLocalStorage.set("statusPlan", "FAILURE", false);
    // //@ts-ignore
    // oNoLocalStorage.set("LinkId", "1", false);
    //@ts-ignore
    localStorage.setItem("isauth", false);
  };
  const displayedToasts = useRef<Set<string>>(new Set());
  const handleGetCall = <T>(url: string): Promise<{ data: T }> => {
    return new Promise((resolve, reject) => {
      const apiURL = handleCreateURL(url);
      axiosInstance
        .get(`${apiURL}`)
        .then(({ data }) => {
          resolve({ data: data.data });
        })
        .catch((error: any) => {
          const logPayload = {
            statusCode: error?.response?.status?.toString() || "NETWORK_ERROR",
            message: error?.message || "Unknown error occurred",
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            context: `API_CALL_FAILURE: ${apiURL}`,
          };
          if (error.message && error.message.includes("Network Error")) {
            showToast("Network Error: Unable to reach the server.");
            sendErrorLog(logPayload);
          } else if (
            error.response.data &&
            error.response.data.status.message === "INVALID CREDENTIALS"
          ) {
            handleLogoutFun();
          } else if (
            error.status == 400 ||
            error.status == 500 ||
            error.status == 502 ||
            error.status == 503
          ) {
            if (error.response.status === 502) {
              sendErrorLog(logPayload);
            }
            if (error.response.data.status === 404) {
              showToast(error.response.data.error);
            } else {
              showToast(error.response.data.status.description);
            }
          }

          reject(error);
        });
    });
  };
  const sendErrorLog = async (payload: {
    statusCode: string;
    message: string;
    timestamp: string;
    page: string;
    context: string;
  }) => {
    try {
      await fetch(`${API_BASE_URL}common/frontend-logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (logError) {
      console.error("Failed to log error:", logError);
    }
  };

  const handlePostCall = <T>({
    URL = "",
    apiParams = {},
    config = {},
  }): Promise<{ data: T; status: any }> => {
    return new Promise((resolve, reject) => {
      const apiURL = handleCreateURL(URL);
      axiosInstance
        .post(`${apiURL}`, apiParams, config)
        .then(({ data }) => {
          resolve({ data: data.data, status: data.status });
        })
        .catch((error: any) => {
          const logPayload = {
            statusCode: error?.response?.status?.toString() || "NETWORK_ERROR",
            message: error?.message || "Unknown error occurred",
            timestamp: new Date().toISOString(),
            page: window.location.pathname, // or hardcode like "HomePage"
            context: `API_CALL_FAILURE: ${apiURL}`, // Describe where it failed
          };
          if (error.message && error.message.includes("Network Error")) {
            toast.error("Network Error: Unable to reach the server.");
            sendErrorLog(logPayload);
          } else if (
            error.response.data.status.message === "INVALID CREDENTIALS"
          ) {
            handleLogoutFun();
          } else if (
            error.status == 400 ||
            error.status == 500 ||
            error.status == 502 ||
            error.status == 503 ||
            error.status == 404
          ) {
            if (error.response.status === 502) {
              sendErrorLog(logPayload);
            }
            if (error.status == 404) {
              toast.error(error.response.data.error);
            } else {
              toast.error(error.response.data.status.description);
            }
          }

          reject(error);
        });
    });
  };
  const handlePutCall = <T>({
    URL = "",
    apiParams = {},
  }): Promise<{ data: T; status: any }> => {
    return new Promise((resolve, reject) => {
      const apiURL = handleCreateURL(URL);
      axiosInstance
        .put(`${apiURL}`, apiParams)
        .then(({ data }) => {
          resolve({ data: data.data, status: data.status });
        })
        .catch((error: any) => {
          if (error.response.status === 502) {
            console.log(
              `[${apiURL}  ${getCurrentDateTime()}] 502 Bad Gateway Error:`,
              error.response.data
            );
          }
          if (error.message && error.message.includes("Network Error")) {
            toast.error("Network Error: Unable to reach the server.");
          } else if (
            error.response.data.status.message === "INVALID CREDENTIALS"
          ) {
            handleLogoutFun();
          } else if (
            error.status == 400 ||
            error.status == 500 ||
            error.status == 502 ||
            error.status == 503
          ) {
            toast.error(error.response.data.status.description);
          }
          reject(error);
        });
    });
  };

  const showToast = (message: string) => {
    if (!displayedToasts.current.has(message)) {
      toast.error(message);
      displayedToasts.current.add(message);
    }
  };
  return {
    handlePutCall,
    handleGetCall,
    handlePostCall,
  };
};

export default useAxiosClient;
