const mongoose = require("mongoose");
const JejuFoodListSchema = mongoose.Schema({
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

const JejuList = mongoose.model("jeju-food-list", JejuFoodListSchema);
module.exports = JejuList;
