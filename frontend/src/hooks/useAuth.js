import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "./useApi";

const useAuth = () => {
  const { request, loading, error } = useApi();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const login = async (email, password) => {
    const data = await request("post", "/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const register = async (name, email, password) => {
    const data = await request("post", "/auth/register", {
      name,
      email,
      password,
    });
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return { user, login, register, logout, loading, error };
};

export default useAuth;
