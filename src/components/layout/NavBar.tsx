import React, { useContext } from "react";

//Components
import { ButtonTheme } from "../inputs/ButtonTheme";

//
import {
  MenuItem,
  Container,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Box,
  useTheme,
} from "@mui/material";

//Icons
import MenuIcon from "@mui/icons-material/Menu";

// Context
import { MenuContext } from "../../context/MenuContext";
import { Button } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const NavBar: React.FC<{ admin?: boolean }> = ({
  admin = false
}) => {
  // Initiate libraries
  const menuContext = useContext(MenuContext);
  const theme = useTheme()
  const navigate = useNavigate();

  // UseStates & function
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (anchor = null) => {
    setAnchorElNav(anchor);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: "4", background: "rgb(63 159 201 / 17%)", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "flex-end" }} >
          {admin &&
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={() => handleCloseNavMenu()}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem
                    key="Home_Menu"
                    sx={{ borderRadius: "100px" }}
                    onClick={() => {
                      handleCloseNavMenu();
                      menuContext?.setValue("home");
                    }}
                  >
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  justifyContent: "space-around",
                  display: { xs: "none", md: "flex" },
                }}
              >
                <MenuItem
                  key="Home"
                  onClick={() => {
                    handleCloseNavMenu();
                    menuContext?.setValue("home");
                  }}
                >
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
              </Box>
            </>}
          <Box sx={{ flexGrow: 0 }}>
            <ButtonTheme />
            {admin && <Button color={"white"} background={theme.palette.mode == "dark" ? "purple.800" : "cyan.800"} variant="solid" onClick={() => {
              localStorage.removeItem('codeBan_token')
              toast.info("Deslogado com sucesso")
              navigate("/")

            }}>Deslogar</Button>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
