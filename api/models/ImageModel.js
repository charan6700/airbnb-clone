const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
  fileName: { type: String, required: true },
  caption: String,
  placeId: { type: String, required: true },
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
