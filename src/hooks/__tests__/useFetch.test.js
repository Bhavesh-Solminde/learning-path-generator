import { act, renderHook, waitFor } from "@testing-library/react";
import useFetch from "../useFetch";

describe("useFetch", () => {
  const mockJsonResponse = (data) => ({
    ok: true,
    headers: { get: () => "application/json" },
    json: () => Promise.resolve(data),
  });

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data on mount and updates state", async () => {
    const payload = { message: "success" };
    global.fetch.mockResolvedValueOnce(mockJsonResponse(payload));

    const { result } = renderHook(() => useFetch("/api/test"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/test",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
    expect(result.current.data).toEqual(payload);
    expect(result.current.error).toBeNull();
  });

  it("supports manual refetch to refresh data", async () => {
    const firstResponse = { items: [1] };
    const secondResponse = { items: [1, 2] };
    global.fetch
      .mockResolvedValueOnce(mockJsonResponse(firstResponse))
      .mockResolvedValueOnce(mockJsonResponse(secondResponse));

    const { result } = renderHook(() => useFetch("/api/list"));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(firstResponse);

    await act(async () => {
      await result.current.refetch();
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(result.current.data).toEqual(secondResponse);
  });
});
