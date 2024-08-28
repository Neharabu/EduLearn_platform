const Course = require("../modals/course");
const Topic = require("../modals/course_topic");

exports.create_course = async (req, res) => {
  try {
    const { image, title, description } = req.body;

    const created_by = req.user.email;
    const course = await Course.create({
      image,
      title,
      description,
      created_by,
    });

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.get_all_created_course = async (req, res) => {
  try {
    const courses = await Course.find({ created_by: req.user.email });
    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.get_courses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.course_details = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('topics')
    const dataWithoutSections = JSON.parse(JSON.stringify(course));

    if (
      dataWithoutSections.hasOwnProperty("topics") &&
      Array.isArray(dataWithoutSections.topics)
    ) {
      // Iterate through the 'topics' array and remove the 'sections' property from each topic object
      dataWithoutSections.topics.forEach((topic) => {
        if (topic.hasOwnProperty("sections")) {
          delete topic.sections;
        }
      });
    }

    return res.status(200).json({
      success: true,
      course: dataWithoutSections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.delete_course = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    for (let i = 0; i < course.topics.length; i++) {
      await Topic.findByIdAndDelete(course.topics[i]);
    }

    await Course.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
