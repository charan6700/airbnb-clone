const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const User = require("./models/UserModel");
const Place = require("./models/PlaceModel");
const Image = require("./models/ImageModel");

const salt = bcrypt.genSaltSync(10);
const secret = "djf8ueh3ad939j3k8ejh398";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static("public"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB!"));

app.get("/test", (req, res) => {
  res.json("test is successful");
});

app.post("/test", async (req, res) => {
  const updatedPlace = await Place.findByIdAndUpdate(
    "64b7ebb547d7006cb6ed73db",
    {
      $push: { "features.photos": "test" },
    }
  );
  res.json(updatedPlace);
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hash = bcrypt.hashSync(password, salt);

  try {
    const newUser = await User.create({
      name,
      email,
      password: hash,
      listings: [],
    });
    console.log("New User:" + JSON.stringify(newUser));
  } catch (err) {
    res.status(422).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email }).exec();

  if (foundUser) {
    if (bcrypt.compareSync(password, foundUser.password)) {
      jwt.sign(
        { email: foundUser.email, id: foundUser._id },
        secret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({
            name: foundUser.name,
            email: foundUser.email,
            listings: foundUser.listings,
            _id: foundUser._id,
          });
        }
      );
    } else {
      res.status(422).json("Login failed");
    }
  } else {
    res.status(422).json("No user exists");
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, secret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id, listings } = await User.findById(
        userData.id
      ).exec();
      res.json({ name, email, _id, listings });
    });
  } else {
    res.json(null);
  }
});

app.post("/place", async (req, res) => {
  const { token } = req.cookies;
  const { property, features, reservations } = req.body;

  if (token) {
    jwt.verify(token, secret, {}, async (err, userData) => {
      if (err) res.status(400).json(err);
      const ownerDoc = await User.findById(userData.id).exec();
      try {
        const newPlace = await Place.create({
          owner: ownerDoc._id,
          status: "new",
          property,
          features,
          reservations,
        });
        ownerDoc.listings.push({
          placeId: newPlace._id,
          createdAt: newPlace.createdAt,
          status: newPlace.status,
        });
        await ownerDoc.save();
        console.log("New Place: " + JSON.stringify(newPlace));
        res.json(newPlace);
      } catch (err) {
        res.status(422).json(err);
      }
    });
  } else {
    res.status(401).json("User verification failed!");
  }
});

app.get("/place/:placeId", async (req, res) => {
  const { placeId } = req.params;
  try {
    const placeDoc = await Place.findById(placeId).exec();
    res.json(placeDoc);
  } catch (err) {
    console.log("Get place error: " + err);
    res.status(400).json("Unable to get place");
  }
});

app.put("/place/:placeId", async (req, res) => {
  const { placeId } = req.params;
  const newPlaceDoc = req.body;
  try {
    const updatedPlace = await Place.findByIdAndUpdate(placeId, {
      property: newPlaceDoc.property,
      features: newPlaceDoc.features,
      reservations: newPlaceDoc.reservations,
    });
    console.log(updatedPlace);
    res.json("successfully updated the place!");
  } catch (err) {
    console.log("Unable to update place: " + err);
    res.status(400).json("Unable to update place");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

const upload = multer({ dest: "public/photos" });

app.post("/upload-photos", upload.array("photos", 50), async (req, res) => {
  const uploadedPhotos = [];
  for (const file of req.files) {
    fs.renameSync(file.path, file.path + ".jpg");
    const newPhoto = await Image.create({
      fileName: file.filename + ".jpg",
      caption: "",
      placeId: req.body.placeId,
    });
    const updatedPlace = await Place.findByIdAndUpdate(req.body.placeId, {
      $push: { "features.photos": newPhoto._id },
    });
    uploadedPhotos.push(newPhoto);
  }

  res.json(uploadedPhotos);
});

app.get("/image/:imageId", async (req, res) => {
  const { imageId } = req.params;

  try {
    const photo = await Image.findById(imageId);
    res.json(photo);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
