import { useEffect, useState } from "react";
import Login from "./Login";
import Navbar from "./Navbar";
import Register from "./Register";
import jwtDecode from "jwt-decode";
import Profile from "./Profile";
import { AuthProvider } from "./AuthContext";
import useLocalStorage from "react-use-localstorage";
import "./App.css"

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState();
  const [token, setToken] = useLocalStorage("token");

  useEffect(() => {
    const user = token? jwtDecode(token) : null;
    setUser(user);
  }, [token]);

  // state re renders the page when it changes
  function currentPage() {
    switch (page) {
      case "login":
        return <Login setToken={setToken}/>;
      case "signup":
        return <Register setToken={setToken}/>;
      case "profile":
        return <Profile setToken={setToken}/>;
      default:
        return <p>Page Doesn't exist yet</p>;
    }
  }

  function handlePageChange(page) {
    setPage(page);
  }

  return (
    <AuthProvider>
      <Navbar onPageChange={handlePageChange} setToken={setToken} user={user}/>
      <div className="App">
        {currentPage()}
      </div>
    </AuthProvider>
  );
}

export default App;
