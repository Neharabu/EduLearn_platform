import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((e) => e.auth_state_reducer);
  const { user } = useSelector((e) => e.user_state_reducer);

  const whatsapp = () => {
    location.assign("https://wa.me/+919901152139");
  };

  const logout = () => {
    dispatch({
      type: "overlay_data",
      payload: {
        login: false,
        unlock: { able: false, id: "" },
        contact: false,
        logout: true,
        delete_course: {
          able: false,
          id: "",
        },
      },
    });
  };

  return (
    <header className="w-full fixed top-0  z-[999] h-24 rounded-b-lg  flex justify-center items-center">
      <div className="w-[95%] justify-between  rounded-2xl shadow-2xl h-4/5 px-5 flex bg-[#010409]">
        <div className="w-1/2 flex gap-2 items-center">
          <Link to="/">
            <img
              src={logo}
              className="w-16 object-cover saturate-50"
              alt="aspironkhuze-logo"
            />
          </Link>
          <Link
            to="/"
            className="font-mont phone:hidden mt-1 font-bold text-white"
          >
            AK-EDU
          </Link>
        </div>

        {auth ? (
          <div className="flex w-fit phone:w-1/2 justify-evenly items-center ">
            {user?.role === "admin" ? (
              <Link
                to="/new/course"
                className="text-white flex gap-3 phone:p-2 hover:bg-[#2a3a42]  bg-[#050708]/90 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center "
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
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>

                <span className="phone:hidden"> Add Course</span>
              </Link>
            ) : (
              ""
            )}
            {user?.role === "admin" ? (
              <Link
                to="/students"
                className="text-white flex gap-3 phone:p-2 hover:bg-[#2a3a42]  bg-[#050708]/90 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center "
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
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>

                <span className="phone:hidden"> Students</span>
              </Link>
            ) : (
              ""
            )}

            <button
              type="button"
              onClick={logout}
              className="text-red-700 phone:p-2 flex gap-2 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
            >
              <span className="phone:hidden"> Logout</span>
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
                  d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center phone:w-1/3 w-[25%] justify-evenly">
            <button
              onClick={() =>
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
                  },
                })
              }
              type="button"
              className="text-white phone:p-2 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  "
            >
              <span className="phone:hidden"> Login</span>
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
                  d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                />
              </svg>
            </button>
            <button
              onClick={whatsapp}
              type="button"
              className="py-2.5  phone:p-2 gap-2 items-center flex px-5 text-sm font-medium focus:outline-none  rounded-full border text-white border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200  "
            >
              <span className="phone:hidden"> Contact</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
