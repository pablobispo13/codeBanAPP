// import React, { useContext } from "react";

//Components
import { ButtonTheme } from "../inputs/ButtonTheme";

//
import {
  // MenuItem,
  Container,
  // Menu,
  // Typography,
  // IconButton,
  Toolbar,
  AppBar,
  Box,
} from "@mui/material";

//Icons
// import MenuIcon from "@mui/icons-material/Menu";

// Context
// import { MenuContext } from "../../context/MenuContext";

export const NavBar = () => {
  // Initiate libraries
  // const menuContext = useContext(MenuContext);

  // UseStates & function
  // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
  //   null
  // );
  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  // const handleCloseNavMenu = (anchor = null) => {
  //   setAnchorElNav(anchor);
  // };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: "4", background: "rgb(63 159 201 / 17%)", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "flex-end" }} >
          {/*    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                key="Inicio_Menu"
                sx={{ borderRadius: "100px" }}
                onClick={() => {
                  handleCloseNavMenu();
                  menuContext?.setValue("home");
                }}
              >
                <Typography textAlign="center">Inicio</Typography>
              </MenuItem>
              <MenuItem
                key="Projetos_Menu"
                onClick={() => {
                  menuContext?.setValue("projects");
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">Projetos</Typography>
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
              key="Inicio"
              onClick={() => {
                handleCloseNavMenu();
                menuContext?.setValue("home");
              }}
            >
              <Typography textAlign="center">Inicio</Typography>
            </MenuItem>
            <MenuItem
              key="Projetos"
              onClick={() => {
                menuContext?.setValue("projects");
                handleCloseNavMenu();
              }}
            >
              <Typography textAlign="center">Projetos</Typography>
            </MenuItem> 
          </Box>*/}
          <Box sx={{ flexGrow: 0 }}>
            <ButtonTheme />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
