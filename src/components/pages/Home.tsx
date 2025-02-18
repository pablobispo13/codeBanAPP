// Imports 
import AnimatedCursor from "react-animated-cursor";
import { useTheme } from "@mui/material";

// Components
import { Content } from "../pages/content/Content";
import { NavBar } from "../layout/NavBar";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const theme = useTheme()
  return (
    <>
      {/* Navbar */}
      <NavBar />
      {/* Body */}
      <Content />
      <AnimatedCursor
        key={"cursor"}
        color={theme.palette.mode == "dark" ? "60,147,186" : "90,27,47"}
        outerStyle={{
          mixBlendMode: "exclusion",
        }}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme={theme.palette.mode}
      />
    </>
  )
};

export default Home;
