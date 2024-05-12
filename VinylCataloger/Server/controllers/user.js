import { db } from "../dbConnection.js";
import { s3 } from "../s3.js";
export const getUser = (req, res) => {
  const q = "Select *from user WHERE UserID = ?";
  console.log(req.params.UserID);
  db.query(q, [req.params.UserID], (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data);
    if (data.length === 0) return res.status(404).json("user not found");
    return res.json(data[0]);
  });
};

export const getAvatar = (req, res) => {
  console.log(req);
  const params = {
    Bucket: "vinylcatalogbucket",
    Key: req.query.Key,
  };
  console.log(params);
  var promise = s3.getSignedUrlPromise("getObject", params);
  promise.then(
    function (url) {
      res.send(url);
    },
    function (err) {
      console.log(err);
    }
  );
};
