import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext.js";
import { Box, Stack, Card, Typography } from "@mui/material";
import icon from "../imgs/siteLogo.jpg";
import axios from "axios";

export default function Vinyl({ id }) {
  const [vinylInfo, setVinylInfo] = useState({});
  const [vinylImage, setVinylImage] = useState("");
  const { currentUser } = useAuth();
  const getVinylInformation = () => {
    axios
      .get(`http://localhost:8080/api/vinyls/${currentUser.UserID}/${id}`)
      .then((response) => {
        setVinylInfo(response.data);
        console.log(response);
      })
      .then(getVinylImage())
      .catch((err) => console.log(err));
  };

  const getVinylImage = async () => {
    console.log(vinylInfo);
    const res = await axios.get(
      "http://localhost:8080/api/vinyls/getVinylImage",
      {
        params: {
          Key: vinylInfo[0].ImagePath,
        },
      }
    );
    console.log(res);
    setVinylImage(res.data);
  };
  useEffect(() => {
    getVinylInformation();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Card sx={{ padding: 2, height: 100 }}>
        <Stack direction="row" spacing={2} justifyContent={"space-between"}>
          <Stack direction="row" spacing={2}>
            <img src={vinylImage} height={100}></img>
            <Stack direction="column">
              <Typography variant="h5">
                {vinylInfo[0].Name} - {vinylInfo[0].VinylName}
              </Typography>
              <Typography>Purchased: {vinylInfo[0].DateAdded}</Typography>
            </Stack>
          </Stack>

          <Stack direction="column">
            <Typography variant="h5">Rating</Typography>
            <Typography>1/5</Typography>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}
