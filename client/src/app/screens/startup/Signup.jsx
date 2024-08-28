import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((e) => e.auth_state_reducer);
  const navigate = useNavigate();
  const [form_data, set_form_data] = useState({
    email: "",
    password: "",
    batch_id: "",
    course_id: "",
  });

  const handle_change = (event) => {
    const { name, value } = event.target;
    set_form_data((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handle_submit = async (e) => {
    e.preventDefault();
    console.log(form_data);
    dispatch({ type: "loading_data", payload: true });
    await Axios.post("/api/v1/register/student", form_data)
      .then((res) => {
        console.log(res);
        dispatch({ type: "loading_data", payload: false });
        if (res.data.success === true) {
          alert("created account successfully");
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message || err.message);
      }).finally(()=>{
        dispatch({ type: "loading_data", payload: false });
      })
  };

  const deny_overlays = () => {
    dispatch({
      type: "navbar_data",
      payload: {
        navbar: false,
      },
    });
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
      },
    });
  };

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
    deny_overlays();
  }, []);
  return (
    <section className="fixed w-full z-[99] overflow-y-scroll hero h-screen">
      <div>
        <Toaster />
      </div>
      <Link
        to="/admin/login"
        className="flex absolute top-4 right-4 z-20 items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 "
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
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </Link>

      <div className=" flex w-full relative overflow-y-scroll h-full justify-center items-center">
        <div className="flex z-20 w-1/2  overflow-y-scroll phone:w-[93%] flex-col justify-center items-center">
          <div className="w-full bg-gray-900 rounded-lg shadow dark:border md:mt-0  xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="text-xl flex font-bold  items-center gap-5 leading-tight tracking-tight  md:text-2xl text-white">
                <img src="/logo.png" className="w-12" alt="" />
                <span>Sign up </span>
              </div>
              <form onSubmit={handle_submit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={form_data.email}
                    onChange={handle_change}
                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium  text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={form_data.password}
                    onChange={handle_change}
                    placeholder="••••••••"
                    className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="batch_id"
                    className="block mb-2 text-sm font-medium  text-white"
                  >
                    Batch id
                  </label>
                  <input
                    type="text"
                    name="batch_id"
                    id="batch_id"
                    value={form_data.batch_id}
                    onChange={handle_change}
                    placeholder="ak0922"
                    className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="course_id"
                    className="block mb-2 text-sm font-medium  text-white"
                  >
                    Course id
                  </label>
                  <input
                    type="text"
                    name="course_id"
                    id="course_id"
                    value={form_data.course_id}
                    onChange={handle_change}
                    placeholder="akfullstach096"
                    className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/"
                    className="font-medium text-gray-500 hover:underline "
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
