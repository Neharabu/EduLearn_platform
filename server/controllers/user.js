const User = require("../modals/user");
const Batch = require("../modals/batch");
const send_token = require("../utils/sendToken");

// registration of student
exports.register_student = async (req, res) => {
  try {
    const { email, password, batch_id, course_id } = req.body;

    let student = await User.findOne({ email });

    if (student) {
      return res.status(403).json({
        success: false,
        message: "Student with this mail, already Exist",
      });
    }

    const recover = password;

    const verify_batch = await Batch.findOne({
      batch: batch_id,
      course: course_id,
    });

    const current_batch = String(verify_batch._id);

    student = await User.create({ email, password, recover, current_batch });

    return res.status(200).json({
      success: true,
      message:
        "Account is Created, wait till a verification comes from our team 😊",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//login for student
exports.login_student = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if fields are given or not
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing email & password",
      });
    }

    const student = await User.findOne({ email })
      .select("+password")
      .populate("current_batch");

    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Email id not registered",
      });
    }

    if (student.status === false) {
      return res.status(400).json({
        success: false,
        message: "id is not Activated",
      });
    }

    const is_password_matched = await student.matchPassword(password);
    if (!is_password_matched) {
      return res.status(403).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    send_token(student, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//registration for admin
exports.admin_register = async (req, res) => {
  try {
    const { email, password, encyrption_token } = req.body;
    if (!encyrption_token) {
      return res.status(403).json({
        success: false,
        message: "NO-access with this IP",
      });
    }

    if (encyrption_token !== process.env.ADMIN_EX_TOKEN) {
      return res.status(403).json({
        success: false,
        message: "NO-access with this IP",
      });
    }

    let admin = await User.findOne({ email });


    if (admin) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    const recover = password;
    const role = "admin";
    const status = true;

    admin = await User.create({ email, password, role, recover, status });
    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//login admin
exports.login_admin = async (req, res) => {
  try {
    const { email, password, encyrption_token } = req.body;

    //check if fields are given or not
    if (!email || !password || !encyrption_token) {
      return res.status(400).json({
        success: false,
        message: "Missing email & password , No access",
      });
    }

    if (encyrption_token !== process.env.ADMIN_EX_TOKEN) {
      return res.status(403).json({
        success: false,
        message: "NO access without X-Token",
      });
    }

    const admin = await User.findOne({ email }).select("+password").populate('current_batch')

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Email id not registered",
      });
    }

    const is_password_matched = await admin.matchPassword(password);
    if (!is_password_matched) {
      return res.status(403).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    send_token(admin, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("aktoken", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });


    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//activate student accounts  --- ADMIN PATH
exports.activate_student_account = async (req, res) => {
  try {
    const { students } = req.body;
    if (!students) {
      return res.status(400).json({
        success: false,
        message: "No student",
      });
    }

    students.forEach(async (element) => {
      let student_one = await User.findById(element);
      if (student_one) {
        student_one.status = true;
        student_one.role = "student";
        await student_one.save();
      } else {
      }
    });

    return res.status(200).json({
      success: true,
      message: "Students Activated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete student accounts --- ADMIN PATH
exports.delete_students_account = async (req, res) => {
  try {
    const { students } = req.body;

    if (!students) {
      return res.status(400).json({
        success: false,
        message: "No student",
      });
    }

    students.forEach(async (element) => {
      let student_one = await User.findByIdAndDelete(element);
      if (!student_one) {
      }
    });

    return res.status(200).json({
      success: true,
      message: "Students Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//fetch students from batch ---ADMIN PATH
exports.batch_students = async (req, res) => {
  try {
    const students = await User.find({
      current_batch: String(req.user.current_batch),
    })

    const updated_students = students.filter(
      (e) => String(e._id) != String(req.user._id)
    );

    return res.status(200).json({
      success: true,
      students: updated_students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//deleting a student  ---ADMIN PATH
exports.delete_student_account = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
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


