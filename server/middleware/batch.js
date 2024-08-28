const Batch = require("../modals/batch");



//verifying the batch before creating a student  
exports.verify_batch = async (req, res, next) => {
  try {
    const { batch_id, course_id,email } = req.body;
    const verify_batch = await Batch.findOne({
      batch: batch_id,
      course: course_id,
    }).select("+students")

    if (!verify_batch) {
      return res.status(400).json({
        success: false,
        message: "NO batch ID found on this",
      });
    }

    verify_batch.students = [...verify_batch.students, email];
    await verify_batch.save();

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

