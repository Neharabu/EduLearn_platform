import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

const CourseStageTwo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((e) => e.user_state_reducer);
  const { auth } = useSelector((e) => e.auth_state_reducer);
  const [course, set_course] = useState({});

  const fetch_course = async () => {
    dispatch({ type: "loading_data", payload: true });
    await Axios.get(`/api/v1/course/${id}`)
      .then((res) => {
        console.log(res.data.course);
        if (res.data.success === true) {
          set_course(res.data.course);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch({ type: "loading_data", payload: false });
      });
  };

  useEffect(() => {
    if (user.role === "admin" && auth) {
      fetch_course();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <section className="w-full h-screen gap-4 flex flex-col p-5 items-center">
      <div className="flex w-3/4  h-24"></div>
      <div className="flex phone:flex-col phone:w-5/6 w-3/4 gap-5 morphcard h-auto p-5">
        <img src={course.image} className="w-52 h-32 object-cover rounded-lg" alt="" />
        <div className="flex flex-col gap-2">
          <span className="text-white font-mont text-xl">{course.title}</span>
          <span className="text-gray-400 font-mont ">{course.description}</span>
        </div>
      </div>
      <div className="flex w-4/5 h-3/4  pt-5 overflow-y-scroll flex-wrap">
{course?.topics && course.topics.map((e,index)=>    
    <Link to={`/course/topic/${e._id}`} key={e._id} className="flex h-16 w-16 topics justify-center items-center rounded-full m-4 text-white flex-col hover:text-gray-600 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.1}
            stroke="currentColor"
            className="w-6  h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            />
          </svg>
          <span className="text-[11px]">Day{index+1}</span>
        </Link>)
        }

        <button
        onClick={()=>dispatch({type:"overlay_data",payload:{
            login: false,
            unlock: {able:false,id:''},
            contact: false,
            logout:false,
            delete_course:{
              able:false,
              id:""
            },
            add_topic:true
            
           }})}
          type="button"
          className="text-white m-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm -center  items-center p-2 flex justify-center   w-16 h-16 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default CourseStageTwo;
