import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import { useNavigate } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "Find By City/State", path: "/bycitystate" },
  { name: "Find By Location", path: "/bylocation" },
  { name: "Beer Styles", path: "/beerstyles" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static" sx={{ width: "100%", margin: 0 }}>
      {/* <Container maxWidth="xl"> */}
      <Toolbar disableGutters>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <SportsBarIcon sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            CRAFT.BREWERY.FINDER
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 0 }}>
          {pages.map((page) => (
            <Button
              key={page.name}
              onClick={() => handleNavigate(page.path)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page.name}
            </Button>
          ))}
        </Box>
        <IconButton
          size="large"
          aria-label="open drawer"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      {/* </Container> */}
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
        onClose={handleCloseNavMenu}
      >
        {pages.map((page) => (
          <MenuItem key={page.name} onClick={() => handleNavigate(page.path)}>
            {page.name}
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
}

export default ResponsiveAppBar;
