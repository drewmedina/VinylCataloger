import { db } from "../dbConnection.js";
import { s3 } from "../s3.js";

export const getVinylInfo = (req, res) => {
  const q =
    "SELECT vinyls.VinylName, artist.Name, images.ImagePath, vinyls.DateAdded FROM user JOIN uservinyl ON user.UserID = uservinyl.UserID JOIN vinyls ON uservinyl.VinylID = vinyls.ID JOIN artist ON artist.ID = vinyls.ArtistID JOIN imagevinyl ON imagevinyl.VinylID = vinyls.ID JOIN images ON imagevinyl.ImageID = images.ID WHERE vinyls.ID = ? and user.UserID = ?;";
  db.query(q, [req.params.VinylID, req.params.UserID], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else if (data.length === 0) {
      return res.send("No such vinyl found");
    } else {
      return res.json(data);
    }
  });
};

export const getVinylImage = (req, res) => {
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
