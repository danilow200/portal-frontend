import axios from "axios";
import { CustomButton } from "./style";

export const LogoutButton = () => {
  const logout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/logout/",
        { refresh_token: localStorage.getItem("refresh_token") },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          withCredentials: true,
        }
      );
      localStorage.clear();
      axios.defaults.headers.common["Authorization"] = null;
      window.location.href = "/login";
    } catch (e) {
      console.log("logout não funcionou", e);
    }
  };

  return <CustomButton onClick={logout}>Logout</CustomButton>;
};
