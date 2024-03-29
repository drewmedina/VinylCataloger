import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Avatar, Box, Stack, Typography } from "@mui/material";
export default function App() {
  return (
    <Stack
      direction="row"
      display={"space-between"}
      sx={{
        width: "100%",
        height: "7%",
        bgcolor: "#000000",
        padding: 2,
      }}
    >
      <Box>
        <Typography variant="h4" color={"#FFFFFF"}>
          VinylAI
        </Typography>
      </Box>
      <Box>
        {" "}
        <Avatar src="Avatar.jpg"></Avatar>
      </Box>
    </Stack>
  );
}
