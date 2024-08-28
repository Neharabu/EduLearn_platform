const express = require("express");
const router = express.Router();
const {
  register_student,
  login_student,
  logout,
} = require("../controllers/user");
const { verify_batch } = require("../middleware/batch");
const { auth } = require("../middleware/auth");
const { course_details } = require("../controllers/course");
const { get_topic_details } = require("../controllers/course_topic");
const { topic_access } = require("../middleware/topic");

// basic student routes  -- LOGIN --SIGNUP
router.route("/register/student").post(verify_batch, register_student);
router.route("/login/student").post(login_student);
router.route("/logout").post(logout);

//student course routes
router.route("/my/course/:id").get(auth, course_details);
router.route("/std/topic").get(auth, get_topic_details);

module.exports = router;
