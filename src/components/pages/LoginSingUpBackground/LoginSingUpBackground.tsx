//Components
import { Stack } from "@mui/material";

//css
import "./css/main.css";

//Service
import { useTheme } from "@mui/material";

// Pages
import { LoginSingUp } from "../LoginSingUp";

export const LoginSingUpBackground = () => {
  // Initiate libraries
  const theme = useTheme();

  return (
    <Stack
      sx={{
        background:
          theme.palette.mode === "dark"
            ? "#745561 url(content-background.jpg) no-repeat top center "
            : "#63737d url(content-background-light.jpg) no-repeat top center",
      }}
      id="home"
    >
      <Stack className="row banner" sx={{ filter: "blur(0px)" }}>
        <Stack className="banner-text">
          <Stack className="banner-text">
            <LoginSingUp />
          </Stack>
        </Stack>
      </Stack>
    </Stack >
  );
};
