const express = require("express");
const app = express();
const path = require("path");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./db/db");
const cors = require("cors");
const FoodListSchema = require("./models/FoodListSchema");
const IlsanFoodListSchema = require("./models/IlsanFoodListSchema");
const multer = require("multer");
const { response } = require("express");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 4000);

const PORT = app.get("port");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const diskStorage = multer.diskStorage({
  //   destination: (req, file, done) => {
  //     done(null, path.join(__dirname, "/upload"));
  //   },
  filename: (req, file, done) => {
    done(
      null,
      file.originalname.split(".")[0] + "-" + path.extname(file.originalname)
    );
  },
});
const fileUpload = multer({ storage: diskStorage });

app.get("/", (req, res) => {
  res.send("hello");
});
app.post("/insertseoul", fileUpload.single("foodImage"), (req, res) => {
  const name = req.body.name;
  const place = req.body.place;
  const address = req.body.address;
  const score = req.body.score;
  const mainFood = req.body.mainFood;
  const comment = req.body.comment;
  const foodImage = req.file.path;
  console.log(foodImage);
  console.log(comment);
  cloudinary.uploader.upload(req.file.path, (result) => {
    const newFoodList = new FoodListSchema({
      name,
      place,
      address,
      score,
      mainFood,
      comment,
      foodImage: result.url,
    });
    newFoodList
      .save()
      .then((result) => {
        console.log(result);
        res.json("파일저장");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

app.post("/insertilsan", fileUpload.single("foodImage"), (req, res) => {
  const name = req.body.name;
  const place = req.body.place;
  const address = req.body.address;
  const score = req.body.score;
  const mainFood = req.body.mainFood;
  const comment = req.body.comment;
  const foodImage = req.file.path;
  console.log(foodImage);
  console.log(comment);
  cloudinary.uploader.upload(req.file.path, (result) => {
    const newFoodList = new IlsanFoodListSchema({
      name,
      place,
      address,
      score,
      mainFood,
      foodImage: result.url,
      comment,
    });
    newFoodList
      .save()
      .then((result) => {
        console.log(result);
        res.json("파일저장");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

app.get("/seoul", (req, res) => {
  FoodListSchema.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/seoul/:id", (req, res) => {
  const { id } = req.params;
  FoodListSchema.find({ _id: id }).then((response) => {
    res.json(response);
  });
});
app.delete("/seoul/:id", (req, res) => {
  const { id } = req.params;
  FoodListSchema.deleteOne({ _id: id }).then((response) => {
    res.json(response);
  });
});
app.put("/seoul/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  FoodListSchema.updateOne({ _id: id }, { $set: { ...req.body } }).then(
    (response) => {
      res.json(response);
    }
  );
});

app.get("/place/seoul/:filter", (req, res) => {
  const { filter } = req.params;
  FoodListSchema.find({ place: filter }).then((response) => {
    res.json(response);
  });
});

app.get("/ilsan", (req, res) => {
  IlsanFoodListSchema.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/ilsan/:id", (req, res) => {
  const { id } = req.params;
  IlsanFoodListSchema.find({ _id: id }).then((response) => {
    res.json(response);
  });
});
app.delete("/ilsan/:id", (req, res) => {
  const { id } = req.params;
  IlsanFoodListSchema.deleteOne({ _id: id }).then((response) => {
    res.json(response);
  });
});
app.put("/ilsan/:id", (req, res) => {
  const { id } = req.params;
  IlsanFoodListSchema.updateOne(
    { _id: id },
    { $set: { comment: req.body.comment } }
  ).then((response) => {
    res.json(response);
  });
});

app.get("/place/ilsan/:filter", (req, res) => {
  const { filter } = req.params;
  IlsanFoodListSchema.find({ place: filter }).then((response) => {
    res.json(response);
  });
});

app.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기중`);
});
