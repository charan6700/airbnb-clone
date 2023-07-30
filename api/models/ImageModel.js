const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
  name: String,
  description: String,
  placeId: String,
  data: String,
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
