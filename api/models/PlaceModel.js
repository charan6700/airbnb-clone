const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const PlaceSchema = new Schema(
  {
    status: String,
    owner: {
      type: ObjectId,
      ref: "User",
    },
    property: {
      structure: String,
      privacyType: String,
      location: {
        countryCode: String,
        houseFlatBldg: String,
        areaVillage: String,
        streetAddress: String,
        nearbyLandmark: String,
        cityTown: String,
        pinCode: String,
        countyProvince: String,
      },
      floorPlan: {
        guests: { type: Number, min: 1, max: 16 },
        bedrooms: { type: Number, min: 0, max: 50 },
        beds: { type: Number, min: 1, max: 50 },
        bathrooms: { type: Number, min: 0.5, max: 50 },
      },
    },

    features: {
      amenities: {
        basic: [String],
        standout: [String],
        safety: [String],
      },
      photos: [String],
      title: { type: String, maxLength: 32 },
      description: {
        unique: [String],
        summary: String,
      },
    },

    reservations: {
      visibility: String,
      price: Number,
      discounts: {
        newListing: {
          isSet: { type: Boolean, default: true },
          value: { type: Number, default: 20, min: 0, max: 99 },
        },
        weekly: {
          isSet: { type: Boolean, default: true },
          value: { type: Number, default: 10, min: 0, max: 99 },
        },
        monthly: {
          isSet: { type: Boolean, default: true },
          value: { type: Number, default: 20, min: 0, max: 99 },
        },
      },
      legal: {
        securityCameras: Boolean,
        weapons: Boolean,
        dangerousAnimals: Boolean,
      },
    },
  },
  { timestamps: true }
);

const Place = mongoose.model("Place", PlaceSchema);

module.exports = Place;
