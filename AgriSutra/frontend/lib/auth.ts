export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // ✅ Also remove userId on logout
  }
};

// ✅ New Functions for Handling userId
export const getUserId = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("userId");
};

export const setUserId = (userId: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userId", userId);
  }
};

export const removeUserId = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userId");
  }
};
