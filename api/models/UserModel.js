const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  name: String,
  email: { unique: true, required: true, type: String },
  password: { required: true, type: String },
  listings: [
    {
      placeId: { type: ObjectId },
      createdAt: { type: Date },
      status: { type: String },
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
