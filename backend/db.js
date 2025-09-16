const mongoose = require("mongoose");

const mongoURI =
  "***";

const mongoDB = async (callback) => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    const foodCollection = await mongoose.connection.db.collection("food_items");
    const data = await foodCollection.find({}).toArray();

    const categoryCollection = await mongoose.connection.db.collection("food_category");
    const Catdata = await categoryCollection.find({}).toArray();

    callback(null, data, Catdata);
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
    callback(err, null, null);
  }
};

module.exports = mongoDB;
