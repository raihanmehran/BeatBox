const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen("5000", () => console.log("Listening on port 5000"));

app.get("/", (req, res) => {
  res.send("/");
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "",
    clientSecret: "",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        access_token: data.body.access_token,
        refresh_token: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(() => res.sendStatus(400));
});
