import Axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DeleteCourseOverlay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((e) => e.user_state_reducer);
  const { auth } = useSelector((e) => e.auth_state_reducer);
  const { delete_course } = useSelector((e) => e.overlay_state_reducer);

  const delete_selected_course = async () => {
    dispatch({ type: "loading_data", payload: true });
    await Axios.delete(`/api/v1/delete/course/${delete_course.id}`)
      .then((res) =>{
        console.log(res)
if(res.data.success===true){
    dispatch({ type: "loading_data", payload: false });
    dispatch({
      type: "overlay_data",
      payload: {
        login: false,
        unlock: {able:false,id:''},
        contact: false,
        logout: false,
        delete_course: { able: false, id: "" },
      },
    });
    location.reload();
}

      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch({ type: "loading_data", payload: false });
      });
  };

  useEffect(() => {
    if (!auth && user.role !== "admin") {
      dispatch({
        type: "overlay_data",
        payload: {
          login: false,
          unlock: {able:false,id:''},
          contact: false,
          logout: false,
          delete_course: { able: false, id: "" },
        },
      });
      navigate("/");
    }
  }, []);

  return (
    <section className="fixed w-full z-[99] h-screen">
      <div className=" flex w-full relative h-full justify-center items-center">
        <div
          onClick={() => {
            dispatch({
              type: "overlay_data",
              payload: {
                login: false,
                unlock: {able:false,id:''},
                contact: false,
                logout: false,
                delete_course: { able: false, id: "" },
              },
            });
          }}
          className="flex w-full h-full absolute bg-black z-10 opacity-70"
        ></div>
        <div className="flex z-20 w-full  justify-center items-center">
          <div className="relative phone:w-3/4 w-1/3 rounded-lg shadow bg-gray-700">
            <button
              onClick={() => {
                dispatch({
                  type: "overlay_data",
                  payload: {
                    login: false,
                    unlock: {able:false,id:''},
                    contact: false,
                    logout: false,
                    delete_course: { able: false, id: "" },
                  },
                });
              }}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-100 ">
                Are you sure you want to delete this course ?
              </h3>
              <button
                onClick={delete_selected_course}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white  gap-2 items-center    bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex  px-5 py-2.5 text-center mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  dispatch({
                    type: "overlay_data",
                    payload: {
                      login: false,
                      unlock: {able:false,id:''},
                      contact: false,
                      logout: false,
                      delete_course: { able: false, id: "" },
                    },
                  });
                }}
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteCourseOverlay;
