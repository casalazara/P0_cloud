import { useCallback, useMemo } from "react";
export default function useHttpClient() {
  
    const _getHeaders = useCallback(async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      // JWT access token is stored in the previous fetched token
      const jwt = sessionStorage.getItem("accessToken");
      // Headers are created and returned with te access token
      headers.append("Authorization", `Bearer ${jwt}`);
      return headers;
    }, []);
    
    return useMemo(
      () => ({
        async get(path) {
          const headers = await _getHeaders();
          return fetch(path, { headers, method: "GET" });
        },
        async post(path, body) {
          const headers = await _getHeaders();
          return fetch(path, {
            headers,
            method: "POST",
            body: JSON.stringify(body),
          });
        },
        async put(path, body) {
          const headers = await _getHeaders();
          return fetch(path, {
            headers,
            method: "PUT",
            body: JSON.stringify(body),
          });
        },
        async delete(path) {
          const headers = await _getHeaders();
          return fetch(path, {
            headers,
            method: "DELETE",
          });
        },
      }),
      [_getHeaders]
    );
  }