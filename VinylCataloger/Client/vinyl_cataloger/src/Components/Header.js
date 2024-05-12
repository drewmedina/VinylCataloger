import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext.js";
import { Box, Stack, Avatar, Typography } from "@mui/material";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import axios from "axios";

import icon from "../imgs/siteLogo.jpg";
export default function Header() {
  const { currentUser } = useAuth();
  const [signedUrl, setSignedUrl] = useState("");
  console.log(currentUser);
  const getProfileUrl = async () => {
    const res = await axios.get("http://localhost:8080/api/users/getAvatar", {
      params: {
        Key: currentUser.ProfilePicture,
      },
    });
    console.log(res);
    setSignedUrl(res.data);
  };
  useEffect(() => {
    getProfileUrl();
  }, []);
  console.log(signedUrl);

  const blue = {
    50: "#F0F7FF",
    100: "#C2E0FF",
    200: "#99CCF3",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E6",
    700: "#0059B3",
    800: "#004C99",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const Listbox = styled("ul")(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
  };
  z-index: 1;
  `
  );

  const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }
  `
  );

  const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 50%;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue[300] : blue[200]
    };
    outline: none;
  }
`
  );

  const MenuSectionRoot = styled("li")`
    list-style: none;

    & > ul {
      padding-left: 1em;
    }
  `;

  const MenuSectionLabel = styled("span")`
    display: block;
    padding: 10px 0 5px 10px;
    font-size: 0.75em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    color: ${grey[600]};
  `;
  return (
    <Box
      display="flex"
      sx={{ width: "100%", height: "100%" }}
      justifyContent={"center"}
    >
      <Stack
        direction="row"
        sx={{
          width: "97%",
          height: "7%",
          bgcolor: "#222222",
          paddingY: 2,
          paddingX: 3,
        }}
        justifyContent={"space-between"}
        display="flexbox"
      >
        {/* <img src={icon} flex={1}></img> */}
        <Typography variant="h4" color={"#FFFFFF"}>
          VinylAI
        </Typography>
        <Box>
          {" "}
          <Dropdown>
            <MenuButton>
              <Avatar src={signedUrl}></Avatar>
            </MenuButton>
            <Menu slots={{ listbox: Listbox }}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Language settings</MenuItem>
              <MenuItem>Log out</MenuItem>
            </Menu>
          </Dropdown>
        </Box>
      </Stack>
    </Box>
  );
}
