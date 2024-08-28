/* eslint-disable react/prop-types */

import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminTopic = ({ topic, index, batch_day }) => {
  console.log(index + 1);
  console.log(batch_day);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((e) => e.user_state_reducer);
  const unlock_day = async () => {
  if(user.role === "admin"){
    dispatch({ type: "loading_data", payload: true });
    await Axios.put("/api/v1/day/topic")
      .then((res) => {
        dispatch({ type: "user_data", payload: res.data.user });
        dispatch({ type: "loading_data", payload: false });
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  };

  const go_on_topic = () => {
    dispatch({ type: "day_data", payload: topic._id });
    navigate(`/day/${index + 1}`);
  };

  return (
    <div className="w-[93%] p-4 bg-gray-700 rounded-lg flex gap-4">
      <div className="w-1/4 flex justify-center items-center">
        <div className="flex  w-12 h-12 bg-gray-400 rounded-full border items-center justify-center text-white">
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
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            />
          </svg>
        </div>
      </div>
      <div className="flex w-3/4 justify-between items-center">
        <div className="flex w-2/3 flex-col">
          <span className="text-white font-bold text-xl font-mont">
            {topic?.title}
          </span>
          <span className="text-gray-400 font-medium">
            {topic?.description}
          </span>
        </div>
        <div className="flex">
          {index + 1 <= batch_day ? (
            <button
              onClick={go_on_topic}
              type="button"
              className="text-green-500 flex gap-3 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
              View
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
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          ) : user.role === "admin" ? (
            <button
              onClick={unlock_day}
              type="button"
              className="text-white gap-2 bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.1}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              Unlock course
            </button>
          ) : (
            <button
              type="button"
              className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
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
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              Day Locked
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTopic;
