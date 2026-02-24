import { fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import { API_BASE_URL } from "./constants/constant";

const rawBaseQuery = fetchBaseQuery({
    // baseUrl: API_BASE_URL,
    baseUrl: "https://jsonplaceholder.typicode.com",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }

        headers.set("Content-Type", "application/json");

        return headers;
    },
});

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

export const customBaseQuery: BaseQueryFn<
    string | { url: string; method?: string; body?: any; params?: any },
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    if (result.data) {
        return result;
    }

    if (result.error) {
        const status = result.error.status as number | "FETCH_ERROR";

        const logPayload = {
            statusCode: status?.toString() || "NETWORK_ERROR",
            message: "API Error",
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            context: `API_CALL_FAILURE`,
        };

        if (status === "FETCH_ERROR") {
            toast.error("Network Error: Unable to reach the server.");
            sendErrorLog(logPayload);
        }

        if (status === 401) {
            toast.error("Session expired. Please login again.");
            // handleLogoutFun();
        }

        if (status === 400 || status === 500 || status === 502 || status === 503) {
            toast.error("Something went wrong. Please try again.");
            sendErrorLog(logPayload);
        }

        return result;
    }

    return result;
};
