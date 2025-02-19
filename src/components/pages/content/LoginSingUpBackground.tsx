import { useEffect } from "react";

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

  // UseStates, UseEffects & functions

  const cacheImages = async (params: string[]) => {
    const promises = await params.map((src: string) => {
      return new Promise(function (resolve, reject) {
        const img = new Image();
        img.src = src;
        img.onload = function () {
          resolve("");
        };
        img.onerror = function () {
          reject("");
        };
      });
    });
    await Promise.all(promises);
  };
  useEffect(() => {
    cacheImages(["content-background.jpg", "content-background-light.jpg"]);
  }, []);
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
