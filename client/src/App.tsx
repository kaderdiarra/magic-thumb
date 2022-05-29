// import { SocketContext, socket } from "./context";
import { Routes, Route, Outlet } from "react-router-dom";
import { LoginPage, RegisterPage, HomePage } from "./pages";

import "./index.css";
import { RequireAuth } from "./Auth";
import { AuthProvider } from "./Auth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div>
      <header>Header</header>
      <Outlet />
    </div>
  );
}

export default App;
