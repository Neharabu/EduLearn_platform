import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { navbar } = useSelector((e) => e.navbar_state_reducer);
  const { user } = useSelector((e) => e.user_state_reducer);
  const [courses, set_courses] = useState([]);
const navigate = useNavigate()
  const dispatch = useDispatch();
  const show_navbar = () => {
    dispatch({
      type: "navbar_data",
      payload: {
        navbar: true,
      },
    });
  };

  const verify_user = () => {
    if (user?.role === "admin") {
      fetch_current_batch();
    } else {
      fetch_all_courses();
    }
  };

  const fetch_current_batch = async () => {
   if(user?.current_batch?.current_course){
navigate(`/admin/batch/${user.current_batch.current_course}`)
   }
   else{
    fetch_all_courses();
   }
  };

  const fetch_all_courses = async () => {
    dispatch({ type: "loading_data", payload: true });
    await Axios.get("/api/v1/courses")
      .then((res) => {
        if (res.data.courses) {
          set_courses(res.data.courses);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: "loading_data", payload: false });
      });
  };

  useEffect(() => {
    show_navbar();
    verify_user();
  }, []);

  console.log(user);

  console.log(user);
  return (
    <section className="w-full overflow-y-scroll  flex flex-wrap justify-center items-start h-screen hero">
      {navbar ? <div className="flex  w-full h-20"></div> : ""}
      <div className="w-[96%] flex gap-5  flex-wrap justify-start items-center overflow-y-scroll  h-auto pt-5">
        {courses.map((ele, index) => (
          <CourseCard course={ele} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Landing;
