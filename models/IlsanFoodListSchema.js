const mongoose = require("mongoose");
const IlsanFoodListSchema = mongoose.Schema({
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

const IlsanList = mongoose.model("ilsan-food-list", IlsanFoodListSchema);
module.exports = IlsanList;
