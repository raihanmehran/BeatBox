const express = require("express");
const cors = require("cors");
const knex = require("./database");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/log", (req, res) => {
  res.send("hello");
});

app.get("/users", async (req, res) => {
  try {
    console.log("Here");
    await knex
      .select("id", "name", "username", "password")
      .from("users")
      .then((data) => {
        res.json(data);
      });
  } catch (e) {
    res.status(500).json("error:" + e);
  }
});

app.post("/users/add", async (req, res) => {
  try {
    const user = req.body;
    console.log("data is here");
    console.log(user);

    if (!user) return res.status(404).json("message: no user found!");

    await knex
      .insert(user)
      .into("users")
      .then(() => {
        res.status(200).json("message: user created");
      });
  } catch (e) {
    res.status(500).json("error:" + e);
  }
});

app.put("/users/update", async (req, res) => {
  try {
    const updateUser = req.body;

    console.log(updateUser);

    if (!updateUser) return res.status(404).json("message: no user found!");

    await knex("users")
      .select()
      .where({ id: updateUser.id })
      .first()
      .then((user) => {
        if (user) {
          knex("users")
            .where({ id: updateUser.id })
            .update(updateUser)
            .then(() => {
              res.status(200).json("message: user updated");
            })
            .catch((e) => {
              res.status(500).json("error:" + e);
            });
        } else {
          res
            .status(404)
            .json(`message: user not found with id ${updateUser.id}!`);
        }
      })
      .catch((e) => {
        res.status(500).json(e);
      });
  } catch (e) {
    res.status(500).json("error:" + e);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(404).json("message: id not found");

    const user = await knex("users").where({ id: id }).first();

    if (!user) return res.status(404).json("message: user not found");

    await knex("users")
      .where({ id: id })
      .del()
      .then(() => {
        res.status(200).json("message: user deleted");
      });
  } catch (e) {
    res.status(500).json("error:" + e);
  }
});
// app.get("/", (req, res) => {
//   res.send("/");
// });

// app.post("/login", (req, res) => {
//   const code = req.body.code;
//   console.log("here");
//   if (!code) res.status(404).json("message: token not found");
//   const spotifyApi = new SpotifyWebApi({
//     // MOVE THESE TO .ENV FILE
//     redirectUri: "http://localhost:3000",
//     clientId: "a6df095652924761a9a010ffd4b3b3aa",
//     clientSecret: "d11c01c9d5454880a97c26ca758ae0b5",
//   });

//   spotifyApi
//     .authorizationCodeGrant(code)
//     .then((data) => {
//       res.json({
//         access_token: data.body.access_token,
//         refresh_token: data.body.refresh_token,
//         expiresIn: data.body.expires_in,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.sendStatus(400);
//     });
// });

// app.listen(3001);
const port = parseInt(process.env.PORT, 10) || process.env.API_PORT;
app.listen(port, () => {
  console.log(`Backend api available at ${process.env.API_PATH}`);
});
