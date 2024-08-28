const mongoose = require("mongoose");

const course_topic = new mongoose.Schema({
  title: String,
  description: String,
  sections: [
    {
      title: String,
      description: String,
      image: String,
    },
  ],
  course_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  },

});

module.exports = mongoose.model("topic", course_topic);
