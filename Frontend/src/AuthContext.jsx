import jwtDecode from "jwt-decode";
import { createContext } from "react";
import { useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [token, setToken] = useState("")
  const [user, setUser] = useState(null);

  const updateToken = (token) => {
    window.localStorage.setItem("token", token);
    setToken(token);
    token ? setUser(jwtDecode(token)): setUser(null);
  }

  useEffect(()=> {
    const token = window.localStorage.getItem("token");
    setToken(token);
    token ? setUser(jwtDecode(token)): setUser(null);
    console.log(user)
  }, [])

  return (
    <AuthContext.Provider value={{user, token, updateToken}}>
      {children}
    </AuthContext.Provider>
  )
}

