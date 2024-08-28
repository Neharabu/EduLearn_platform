import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import AdminTopic from "../../components/AdminTopic";

const AdminBatch = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((e) => e.user_state_reducer);
  const { auth } = useSelector((e) => e.auth_state_reducer);
  const navigate = useNavigate();
  const [course, set_course] = useState({});

  const fetch_data = async () => {
    if (user?.current_batch) {
      fetch_the_course();
    } else {
      navigate("/");
    }
  };

  const fetch_the_course = async () => {
   if(user.role==="admin"){
    dispatch({ type: "loading_data", payload: true });
    await Axios.get(`/api/v1/course/${user.current_batch.current_course}`)
      .then((res) => {
        console.log(res)
        if (res.data.success === true) {
          set_course(res.data.course);
                }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch({ type: "loading_data", payload: false });
      });
   }
   else{
    dispatch({ type: "loading_data", payload: true });
    await Axios.get(`/api/v1/my/course/${user.current_batch.current_course}`)
      .then((res) => {
        console.log(res)
        if (res.data.success === true) {
          set_course(res.data.course);
          fetch_me()
                }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch({ type: "loading_data", payload: false });
      });
   }
  };

  const fetch_me = async () => {
    dispatch({ type: "loading_data", payload: true });
    await Axios.get("/api/v1/me")
      .then((res) => {
        if (res.data.user) {
          dispatch({ type: "user_data", payload: res.data.user });
        } else {
          alert("something went wrong");
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

if(auth){
  fetch_data();
}else{
  navigate('/')
}

  }, []);



  return (
    <>

      <section className="w-full pt-32 phone:flex-col phone:items-center flex h-screen gap-4 justify-center ">
        <div className="flex w-[22%] overflow-y-scroll phone:w-[80%] flex-col h-auto p-5 justify-between morphcard  gap-2">
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-mont text-sm font-bold flex text-white">
                <span className="text-gray-300 text-[11px]">Batch</span>:{" "}
                {user?.current_batch?.batch}
              </span>
              <span className="font-mont font-bold text-sm flex text-white">
                <span className="text-gray-300 text-[11px]">Course</span>:{" "}
                {user?.current_batch?.course}
              </span>
            </div>
            <img src={course.image} className="w-60 rounded-md" alt="" />

            <div className="flex flex-col ">
              <span className="text-xl font-mont font-bold text-white">
                {course.title}
              </span>
              <span className="font-mont text-gray-400 ">
                {course.description}
              </span>

              <span className="text-green-600 mt-2 font-medium text-[12px]">
                You have this as active batch.
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-between h-auto">
            <div className="w-full justify-start flex items-start">
            {user?.role ==="admin"  ?<button
                onClick={() => {
                  dispatch({
                    type: "delete_batch_data",
                    payload: { able: true, id: user.current_batch._id },
                  });
                }}
                type="button"
                className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>:''}
            </div>
          </div>
        </div>

        <div className=" flex flex-col items-end overflow-y-scroll phone:items-center  phone:w-[100%] gap-2 w-[70%] h-[95%]">
{ course?.topics && course.topics.map((e,index)=> <AdminTopic batch_day={user?.current_batch?.batch_period} topic={e} index={index} key={e._id} />)}
        </div>
      </section>
    </>
  );
};

export default AdminBatch;
