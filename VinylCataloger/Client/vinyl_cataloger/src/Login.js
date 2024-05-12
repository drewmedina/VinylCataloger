import React from "react";
import { Box, Typography, TextField, Stack, Button, Card } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.js";
export default function Login() {
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    const data = {
      username: userName,
      password: password,
    };
    console.log(data);
    e.preventDefault();
    try {
      await login(data);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <Box display={"flex"} justifyContent={"center"} padding={3}>
      {err ? (
        alert(err)
      ) : (
        <Card sx={{ padding: 2 }} bgcolor={"#232323"}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h3">Login or Register An Account</Typography>
            <TextField
              label="Username"
              onChange={(event) => setUserName(event.target.value)}
            ></TextField>
            <TextField
              label="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></TextField>
            <Button
              sx={{ backgroundColor: "#1212AA" }}
              variant="outlined"
              onClick={handleLogin}
            >
              <Typography color={"#FFFFFF"}>Submit</Typography>
            </Button>
            <Button sx={{ backgroundColor: "#1212AA" }} variant="outlined">
              <Typography color={"#FFFFFF"}>SignUp</Typography>
            </Button>
          </Stack>
        </Card>
      )}
    </Box>
  );
}
