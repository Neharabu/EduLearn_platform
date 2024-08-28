const Batch = require("../modals/batch");
const Course = require("../modals/course");
const User = require("../modals/user");

//creating a batch --ADMIN PATH
exports.create_batch = async (req, res) => {
  try {
    const verify_course = await Course.findById(req.body.course_id);
    if (!verify_course) {
      return res.status(400).json({
        success: false,
        message: "NO Course Found",
      });
    }

    let batch = `${req.user.email}${String(Date.now()).slice(9, 12)}`;
    let course = `${req.user.email}${verify_course.title.slice(0, 2)}${String(
      Date.now()
    ).slice(9, 12)}`;
    let batch_admin = req.user.email;
    let current_course = req.body.course_id;

    const new_batch = await Batch.create({
      batch,
      course,
      batch_admin,
      current_course,
    });

    const admin = await User.findById(req.user._id);
    admin.current_batch = new_batch._id;
    await admin.save();
    return res.status(200).json({
      success: true,
      message: "Batch Created Successfully",
      batch: new_batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete a batch --ADMIN PATH
exports.delete_batch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id).select('+students')
    const admin = await User.findById(req.user._id);

    batch.students.forEach(async (element) => {
      const studentone = await User.findOne({ "email": element });
      await User.findByIdAndDelete(studentone._id);
    });

    admin.current_batch = undefined;
    await Batch.findByIdAndDelete(req.params.id);
    await admin.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//fetching the active batch
exports.get_batch = async (req, res) => {
  try {
    const batch = await Batch.findOne({ batch_admin: String(req.user.email) });
    res.status(200).json({
      success: true,
      batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//unlock a batch --ADMIN PATH
exports.unlock_period = async (req, res) => {
  try {
    const batch = await Batch.findById(req.user.current_batch);
    const num = batch.batch_period + 1;
    batch.batch_period = num;
    await batch.save();
    const user = await User.findById(req.user._id).populate("current_batch");

    return res.status(200).json({
      success: true,
      message: "Unlocked",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//lock a day --ADMIN PATH
exports.lock_period = async (req, res) => {
  try {
    const { batch_id } = req.params;
    const batch = await Batch.findById(batch_id);
    const num = batch.batch_period - 1;
    batch.batch_period = num;
    await batch.save();

    return res.status(200).json({
      success: true,
      message: "Locked",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
