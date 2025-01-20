const mongoose= require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Prodios", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDBs");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); 
  }
};

module.exports = connectDB;
