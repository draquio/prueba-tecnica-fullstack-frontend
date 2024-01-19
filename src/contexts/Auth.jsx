import { useState, useEffect, createContext } from "react";
import { User } from "../services/user";
import { Auth } from "../services/auth";
import { hasExpiredToken } from "../utils/token";

const UserController = new User();
const AuthController = new Auth();
export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const accessToken = AuthController.getAccessToken();
      const refreshToken = AuthController.getRefreshToken();
      if (!accessToken || !refreshToken) {
        logout();
        setLoading(false);
        return;
      }
      if (hasExpiredToken(accessToken)) {
        if (hasExpiredToken(refreshToken)) {
          logout();
        } else {
          await reLogin(refreshToken);
        }
      } else {
        await login(accessToken);
      }

      setLoading(false);
    })();
  }, []);


  const login = async (accessToken) => {
    try {
      const response = await UserController.getMe(accessToken);
      delete response.password;
      setUser(response);
      setToken(accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const reLogin = async (refreshToken) => {
    try {
      const { accessToken } = AuthController.refreshAccessToken(refreshToken);
      AuthController.setAccessToken(accessToken);
      await login(accessToken)
    } catch (error) {
      console.error(error);
    }
  };


  const logout = () => {
    setUser(null);
    setToken(null);
    AuthController.removeTokens();
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
  };
  if (loading) {
    return null;
  }

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
