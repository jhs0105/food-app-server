const mongoose = require("mongoose");
const FoodListSchema = mongoose.Schema({
  name: {
    type: String,
    requre: true,
  },
  place: {
    type: String,
    requre: true,
  },
  address: String,
  score: Number,
  mainFood: String,
  foodImage: {
    type: String,
    require: true,
  },
  comment: String,
});

const List = mongoose.model("food-list", FoodListSchema);
module.exports = List;
