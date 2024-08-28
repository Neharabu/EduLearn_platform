/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { image, description, title, _id } = course;
  const { user } = useSelector((e) => e.user_state_reducer);
  const { auth } = useSelector((e) => e.auth_state_reducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const take_action = () => {
    if (!auth) {
      dispatch({
        type: "overlay_data",
        payload: {
          login: true,
          unlock: { able: false, id: "" },
          contact: false,
          logout: false,
          delete_course: {
            able: false,
            id: "",
          },
          add_topic: false,
          add_section: {
            able: false,
            id: "",
          },
        },
      });
    }

    if (user.role === "student") {
      verify_student_batch();
    }
    if (user.role === "admin") {
      verify_admin_batch();
    }
  };

  const verify_student_batch = async () => {

    if (user?.current_batch.current_course === String(_id)) {
      navigate(`/admin/batch/${_id}`);
    } else {
      toast.error("you are not part of this course 😢");
    }
  };

  const verify_admin_batch = () => {
    if (user?.current_batch?.current_course === String(_id)) {
      navigate(`/admin/batch/${_id}`);
    } else {
      dispatch({
        type: "overlay_data",
        payload: {
          login: false,
          unlock: { able: true, id: _id },
          contact: false,
          logout: false,
          delete_course: {
            able: false,
            id: "",
          },
          add_topic: false,
          add_section: {
            able: false,
            id: "",
          },
        },
      });
    }
  };

  const view_course = () => {
    console.log(`/admin/batch/${user.current_batch.current_course}`)
    navigate(`/admin/batch/${user.current_batch.current_course}`);
  };

  return (
    <div className=" w-72  h-[22rem] phone:h-[28rem] my-3 phone:w-[95%] morphcard border p-3 border-gray-200 rounded-lg shadow  flex flex-col justify-between">
      <div>
        <Toaster />
      </div>

      <img
        className="rounded-t-lg object-fill w-full h-1/2"
        src={image}
        alt=""
      />

      <div className="p-1 flex flex-col h-auto justify-between">
        <a href="#">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-100 ">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-sm text-gray-500 ">
          {description.slice(0, 120)}...
        </p>
      </div>
      {user?.current_batch?.current_course == _id ? (
        <button
          onClick={view_course}
          type="button"
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          View course{" "}
        </button>
      ) : (
        <button
          onClick={take_action}
          className="inline-flex w-2/3 gap-3 items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 "
        >
          Unlock the course
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.9}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default CourseCard;
