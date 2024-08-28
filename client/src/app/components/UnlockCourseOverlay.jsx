import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";

const UnlockCourseOverlay = () => {
  const dispatch = useDispatch();
  const { unlock } = useSelector((e) => e.overlay_state_reducer);
  const { user } = useSelector((e) => e.user_state_reducer);

  const unlock_course = async () => {
    if (user.current_batch == undefined || !user.current_batch) {
      dispatch({ type: "loading_data", payload: true });
      await Axios.post("/api/v1/new/batch", {
        course_id: unlock.id,
      })
        .then(async (res) => {
          if (res.data.success == true) {
            await fetch_me();
          }
        })
        .catch((err) => {
          console.log(err);
          alert(
            err.response.data.message || err.message || "some internal error"
          );
        })
        .finally(() => {
          dispatch({ type: "loading_data", payload: false });
        });
    } else {
      alert("You have an Active batch. cannot unlock another ");
    }
  };

  const fetch_me = async () => {
    await Axios.get("/api/v1/me").then((res) => {
      if (res.data.success == true) {
        dispatch({ type: "user_data", payload: res.data.user });
        dispatch({ type: "loading_data", payload: false });
        dispatch({
          type: "overlay_data",
          payload: {
            login: false,
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
        })

alert('created Sucessfully')
      }
    });
  };

  return (
    <section className="fixed w-full z-[99] h-screen">
      <div className=" flex w-full relative h-full justify-center items-center">
        <div
          onClick={() => {
            dispatch({
              type: "overlay_data",
              payload: {
                login: false,
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
          }}
          className="flex w-full h-full absolute bg-black z-10 opacity-70"
        ></div>
        <div className="flex z-20">
          <div className="relative rounded-lg shadow bg-gray-700">
            <button
              onClick={() => {
                dispatch({
                  type: "overlay_data",
                  payload: {
                    login: false,
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
                Are you sure you want to Unlock this Course ?
              </h3>
              <button
                onClick={unlock_course}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white  gap-2 items-center    bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm inline-flex  px-5 py-2.5 text-center mr-2"
              >
                Unlock
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.9}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  dispatch({
                    type: "overlay_data",
                    payload: {
                      login: false,
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

export default UnlockCourseOverlay;
