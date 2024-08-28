const Course_topic = require("../modals/course_topic");
const Course = require("../modals/course");
const User = require("../modals/user");

exports.create_topic = async (req, res) => {
  try {
    const { title, description, course_id } = req.body;

    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "NO course found",
      });
    }

    const course_topic = await Course_topic.create({
      title,
      description,
      course_id,
    });

    course.topics.push(course_topic._id);
    await course.save();

    return res.status(200).json({
      success: true,
      message: "created Topic successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.update_topic = async (req, res) => {
  try {
    const topic = await Course_topic.findById(req.params.id);

    const updated_sections = [...topic.sections, req.body];

    topic.sections = updated_sections;
    await topic.save();


    res.status(200).json({
      success: true,
      topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.delete_topic = async (req, res) => {
  try {
    const { course_id, course_topic_id } = req.query;
    let course = await Course.findById(course_id);

    // Find the index of the topic with ID 1
    let indexToRemove = -1;
    course.topics.forEach((topic, index) => {
      if (topic.id === course_topic_id) {
        indexToRemove = index;
      }
    });

    // Remove the topic with ID 1 if found
    if (indexToRemove !== -1) {
      course.topics.splice(indexToRemove, 1);
    }

    await course.save();
    await Course_topic.findByIdAndDelete(course_topic_id);

    return res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.get_topic_details = async (req, res) => {
  try {
const user = await User.findById(req.user._id).populate('current_batch')

const limit  = user?.current_batch?.batch_period
const index  = req.query.index
const id  = req.query.id


if(index<=limit){
  const topic = await Course_topic.findById(id);
  return res.status(200).json({
    success: true,
    topic,
  });
}

else{
  return res.status(404).json({
    success:false,
    message:'Cannot Serve resources'
  })
}




  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.get_topic_details_admin = async (req, res) => {
  try {

  const topic = await Course_topic.findById(req.params.id);
  return res.status(200).json({
    success: true,
    topic,
  });






  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
