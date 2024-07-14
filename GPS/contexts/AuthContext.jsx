import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const inititalState = {
  user: null,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown errror");
  }
}
const FAKE_USER = {
    name: "Shasank",
    email: "shasankreddy4563@gmail.com",
    password: "reddy4563",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    inititalState
  );

  function login(email, password) {
     if(email===FAKE_USER.email && password===FAKE_USER.password)
        dispatch({type:"login",payload:FAKE_USER})
  }
  function logout() {
    dispatch({type:"logout"})
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
