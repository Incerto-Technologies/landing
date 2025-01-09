import { ACCESS_TOKEN_KEY } from "@/hooks/use-get-access-token";

export const fetchWithAuth = async (url: string, options?: RequestInit) => {
  const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);

  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
