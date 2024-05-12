import React from "react";
import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  SpeedDial,
  Button,
  Popover,
} from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import axios from "axios";

const filePaths = [
  "1712432217246-Avatar (1).jpg",
  "1712432217246-Avatar (2).jpg",
  "1712432217246-Avatar.jpg",
  "food (2).jpg",
  "food.jpg",
  "PacManandGhostsInkyBlinkyPinkyandClyde.png",
];
export default function Landing() {
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [imgComponents, setImgComponents] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleUpload = () => {
    const formdata = new FormData();
    formdata.append("image", file);
    axios
      .post("http://localhost:8080/upload", formdata)
      .then((res) => {
        setImages([res.data.imagepath, ...images]);
        console.log(images);
      })
      .catch((err) => console.log(err));
  };

  const generateImgComponents = () => {
    if (imageUrls) {
      console.log("HI", imageUrls);
      const components = imageUrls.map((imageUrl) => (
        <img key={imageUrl} src={imageUrl} alt="Image" width={"100px"} />
      ));
      setImgComponents(components);
      console.log("HI", components);
    }
  };

  const fetchData = async () => {
    const imageUrls = [];
    if (filePaths) {
      filePaths.forEach((fileName) =>
        axios
          .get(`http://localhost:8080/posts?key=${fileName}`)
          .then((res) => {
            imageUrls.push(res.data);
            console.log(imageUrls);
          })
          .catch((err) => console.log(err))
      );
    }
    return imageUrls;
  };

  useEffect(() => {
    (async () => {
      try {
        try {
          const urls = await fetchData();
          setImageUrls(urls);
        } finally {
          generateImgComponents();
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <Box
      display="flex"
      sx={{ width: "100%", height: "100%" }}
      justifyContent={"center"}
    >
      {loading ? (
        <Typography>Loading</Typography>
      ) : (
        <Stack flex={1} direction="column" spacing={3}>
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
          <Box display="grid" width="100%" justifyContent="center">
            <Button
              padding={2}
              sx={{ width: "100%" }}
              variant="outlined"
              onClick={handleClick}
            >
              Add Record To Collection
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Stack
                spacing={2}
                direction={"column"}
                sx={{ padding: 2 }}
                justifyContent={"center"}
              >
                <input
                  onChange={fileSelected}
                  type="file"
                  accept="image/*"
                ></input>
                <Button variant="outlined" onClick={handleUpload}>
                  Confirm Upload
                </Button>
              </Stack>
            </Popover>
          </Box>
          <Stack direction={"row"} justifyContent={"center"}>
            <Box
              bgcolor={"#6C7780"}
              sx={{ width: "80%", height: 950 }}
              padding={3}
            >
              <Stack direction={"column"}> {imgComponents}</Stack>
            </Box>
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
