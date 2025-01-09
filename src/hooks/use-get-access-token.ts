export type AccessToken = {
  accessToken: string;
  expiresInSeconds: number;
  refreshToken: string;
  tokenType: string;
};

export const ACCESS_TOKEN_KEY = "accessToken";

export const useGetAccessToken = () => {
  const user = {
    username: "demouser",
    password: "demouser",
    grant_type: "password",
  };

  const getAccessToken = async () => {
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      return accessToken;
    }

    const apiUrl = import.meta.env.VITE_API_URL;

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("password", user.password);
    formData.append("grant_type", user.grant_type);

    const response = await fetch(`${apiUrl}/api/v1/token`, {
      method: "POST",
      body: formData,
    });
    const data: AccessToken = await response.json();

    if (data.accessToken) {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    }

    return data;
  };

  return {
    getAccessToken,
  };
};
