import { jwtDecode } from "jwt-decode";

export const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.sub || decoded.username || null;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

export const isAdmin = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.roles?.includes("ROLE_ADMIN") || false;
  } catch (err) {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
