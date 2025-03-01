export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("token");
  return !!token;
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
