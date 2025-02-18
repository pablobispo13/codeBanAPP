import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import AdminPage from "./components/pages/AdminPage";

export const Router = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/restricted" element={<AdminPage />} />
    </Routes>
  </BrowserRouter>
};
