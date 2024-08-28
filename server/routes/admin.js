const express = require("express");
const router = express.Router();
const {
  admin_register,
  login_admin,
  batch_students,
  delete_student_account,
  delete_students_account,
  activate_student_account,
} = require("../controllers/user");
const {
  create_course,
  get_courses,
  course_details,
  get_all_created_course,
  delete_course,
} = require("../controllers/course");
const {
  create_topic,
  delete_topic,
  get_topic_details,
  update_topic,
  get_topic_details_admin
} = require("../controllers/course_topic");
const {
  create_batch,
  delete_batch,
  get_batch,
  unlock_period,
} = require("../controllers/batch");
const { admin, me } = require("../middleware/auth");

// admin basic
router.route("/register/admin").post(admin_register);
router.route("/login/admin").post(login_admin);
router.route("/me").get(me);



/*****************Course API**************/

// create new course
router.route("/new/course").post(admin, create_course);


//delete a course 
router.route("/delete/course/:id").delete(admin, delete_course);


//getting my created courses 
router.route("/mycourses").get(admin, get_all_created_course);

//update a course topic
router.route("/topic").post(admin, create_topic);


//create a topic section
router.route("/new/section/:id").put(admin, update_topic);


//delete a course topic
router.route("/course/topic").delete(admin, delete_topic);

//getting a topic details
router.route("/topic").get(admin, get_topic_details);

router.route("/admin/topic/:id").get(admin, get_topic_details_admin);
//get all courses
router.route("/courses").get(get_courses);

//get a course details
router.route("/course/:id").get(admin, course_details);

//creating a new batch linked with course
router.route("/new/batch").post(admin, create_batch);

/*getting the current batch
    ***{ 

      so when admin logs in there should be a
            API hit to this, it return you that which is the current 
            batch admin is teaching.from that batch ,
            you can fetch the course
        }***
*/
router.route("/batch").get(admin, get_batch);

/*deleting current batch
    ***{ 
            required batch id in --PARAMS--
            to delete the whole batch after the course gets 
            ends
        }***
*/
router.route("/batch/:id").delete(admin, delete_batch);

/*unlocking next day in batch course
    ***{ 
            required batch id in --PARAMS--
            to update batch_priod and from this we can 
            find the index of topic 
        }***
*/
router.route("/day/topic").put(admin, unlock_period);

/*getting all batch students   
    ***{ 
        fetching all students whose current batch 
        is with admin  
    }***
*/
router.route("/batch/students").get(admin, batch_students);

/*deleting a perticular student
    ***{ 
            required a student id in --PARAMS-- to delete the ,
            student from batch
        }***
*/
router.route("/student/:id").delete(admin, delete_student_account);

/* deleting all students   
    ***{ 
            required an array of students in --BODY-- ,
            function will loop through the students array
            and will delete them 
        }***
*/
router.route("/all/students").delete(admin, delete_students_account);

/*activating all students   
    ***{ 
            required an array of students in --BODY-- ,
            function will loop through the students array
            and will make their status active 
        }***
*/
router.route("/activate").put(admin, activate_student_account);

module.exports = router;
