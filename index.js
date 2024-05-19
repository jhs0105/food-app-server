const express = require("express");
const app = express();
const path = require("path");
const cloudinary = request("cloudinary").v2;
import { v2 as cloudinary } from "cloudinary";
const dotenv = require("dotenv");
dotenv.config();
const db = require("./db/db");
const cors = require("cors");
const FoodListSchema = require("./models/FoodListSchema");
const IlsanFoodListSchema = require("./models/IlsanFoodListSchema");
const JejuFoodListSchema = require("./models/JejuFoodListSchema");
const multer = require("multer");
const { request } = require("http");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.set("port", process.env.PORT || 3000);

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
    done(null, file.originalname);
  },
});
const fileUpload = multer({ storage: diskStorage });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인에서 접근 허용
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
  //console.log(comment);
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

app.post("/insertjeju", fileUpload.single("foodImage"), (req, res) => {
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
    const newFoodList = new JejuFoodListSchema({
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
  IlsanFoodListSchema.updateOne({ _id: id }, { $set: { ...req.body } }).then(
    (response) => {
      res.json(response);
    }
  );
});
app.get("/place/ilsan/:filter", (req, res) => {
  const { filter } = req.params;
  IlsanFoodListSchema.find({ place: filter }).then((response) => {
    res.json(response);
  });
});

app.get("/jeju", (req, res) => {
  JejuFoodListSchema.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/jeju/:id", (req, res) => {
  const { id } = req.params;
  JejuFoodListSchema.find({ _id: id }).then((response) => {
    res.json(response);
  });
});
app.delete("/jeju/:id", (req, res) => {
  const { id } = req.params;
  JejuFoodListSchema.deleteOne({ _id: id }).then((response) => {
    res.json(response);
  });
});
app.put("/jeju/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  JejuFoodListSchema.updateOne({ _id: id }, { $set: { ...req.body } }).then(
    (response) => {
      res.json(response);
    }
  );
});

app.get("/place/jeju/:filter", (req, res) => {
  const { filter } = req.params;
  JejuFoodListSchema.find({ place: filter }).then((response) => {
    res.json(response);
  });
});

app.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기중`);
});
