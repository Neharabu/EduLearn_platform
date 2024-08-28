const mongoose = require("mongoose");

const course_schema = new mongoose.Schema({
  image: String,
  title: {
    type: String,
    required: [true, "please enter the name "],
    maxLength: [30, "name cannot exceed 30 char"],
    minLength: [4, "name should have more than 5 char"],
  },
  description: { type: String, required: [true, "Description Missing "] },
  topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "topic",
    },
  ],
  created_by:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("course", course_schema);
