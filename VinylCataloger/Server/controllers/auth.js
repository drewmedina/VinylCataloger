import { db } from "../dbConnection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const login = (req, res) => {
  const q = "Select * from user WHERE Username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("user not found");
    const checkPass = bcrypt.compareSync(req.body.password, data[0].Password);
    if (!checkPass) return res.status(400).json("User or Password Incorrect");
    const token = jwt.sign({ id: data[0].id }, "secretkey");
    const { password, ...other } = data[0];
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};
export const register = (req, res) => {
  //check user
  {
    const q = "Select * From user WHERE Username = ?";
    db.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists");
    });
  }
  //create new user
  //hash pass
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(req.body.password, salt);
  const q = "Insert into user(Username, Password) VALUE (?, ?)";
  db.query(q, [req.body.username, hashedPass], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("User has been created");
  });
};
export const signout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User Logged Out");
};
