import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
};

const createError = (response) => {
  const error = new Error(`Request failed with status ${response.status}`);
  error.status = response.status;
  return error;
};

const useFetch = (url, options = {}, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const serializedOptions = useMemo(() => JSON.stringify(options), [options]);

  const runRequest = useCallback(
    async (retryCount = 0) => {
      if (!url) {
        return null;
      }

      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setError(null);

      const request = async (attempt = 0) => {
        try {
          const response = await fetch(url, {
            ...optionsRef.current,
            signal: controller.signal,
          });

          if (!response.ok) {
            throw createError(response);
          }

          return await parseResponse(response);
        } catch (err) {
          if (controller.signal.aborted) {
            throw err;
          }

          if (attempt < 1) {
            return request(attempt + 1);
          }

          throw err;
        }
      };

      try {
        const result = await request(0);
        if (!controller.signal.aborted) {
          setData(result);
          setError(null);
        }
        return result;
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err);
        }
        throw err;
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    },
    [url]
  );

  const refetch = useCallback(() => runRequest(), [runRequest]);

  useEffect(() => {
    runRequest();

    return () => {
      abortControllerRef.current?.abort();
    };
    // deps array ensures consumers control re-fetching in addition to url/options
  }, [runRequest, serializedOptions, ...deps]);

  return { data, loading, error, refetch };
};

export default useFetch;
