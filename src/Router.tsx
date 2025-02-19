import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import AnimatedCursor from "react-animated-cursor";
import { ToastContainer } from "react-toastify";
import { useTheme } from "@mui/material";
import { LoginSingUpBackground } from "./components/pages/content/LoginSingUpBackground";
import { NavBar } from "./components/layout/NavBar";
import { AdminPage } from "./components/pages/AdminPage";

export const Router = () => {
  const theme = useTheme();

  function detectNotMob() {
    return ((window.innerWidth >= 800) && (window.innerHeight >= 600));
  }
  return (
    <BrowserRouter>
      {detectNotMob() &&
        <AnimatedCursor
          key={"cursor"}
          color={theme.palette.mode === "dark" ? "60,147,186" : "90,27,47"}
          outerStyle={{
            mixBlendMode: "exclusion",
          }}
        />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme={theme.palette.mode}
      />
      <Routes>
        {/* Rota de Login */}
        <Route path="/" element={<LoginLayout />}>
          <Route index element={<LoginSingUpBackground />} />
        </Route>

        {/* Rota Restrita/Admin */}
        <Route path="/restricted" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
        </Route>

        {/* Rota Padrão (Caso a rota não exista) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const LoginLayout: React.FC = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

const AdminLayout: React.FC = () => (
  <>
    <NavBar admin />
    <Outlet />
  </>
);
