import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const {auth} = useSelector(e=>e.auth_state_reducer)
  const navigate = useNavigate();
  const [form_data, set_form_data] = useState({
    email: "",
    password: "",
    encyrption_token: "",
  });

  const handle_change = (event) => {
    const { name, value } = event.target;
    set_form_data((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //function to handle form
  const handle_form = async (e) => {
    e.preventDefault();
    dispatch({ type: "loading_data", payload: true });
    await Axios.post("/api/v1/login/admin", form_data)
      .then((res) => {
        if (res.data.success === true) {
          dispatch({ type: "user_data", payload: res.data.user });
          dispatch({ type: "auth_data", payload: true });
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Internal Server Error");
      })
      .finally(() => {
        dispatch({ type: "loading_data", payload: false });
      });
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

  const fetch_me = async () => {
    dispatch({ type: "loading_data", payload: true });
    await Axios.get("/api/v1/me")
      .then((res) => {
        if (res.data.user) {
          dispatch({ type: "user_data", payload: res.data.user });
          navigate('/')
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
      fetch_me();
  
    }
    deny_overlays();
    fetch_me();
  }, []);
  return (
    <section className="fixed w-full z-[99] overflow-y-scroll hero h-screen">
      <div>
        <Toaster />
      </div>
      <div className=" flex w-full relative overflow-y-scroll h-full justify-center items-center">
        <div className="flex z-20 w-1/2  overflow-y-scroll phone:w-[93%] flex-col justify-center items-center">
          <div className="w-full bg-gray-900 rounded-lg shadow dark:border md:mt-0  xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="text-xl flex font-bold  items-center gap-5 leading-tight tracking-tight  md:text-2xl text-white">
                <img src="/logo.png" className="w-12" alt="" />
                <span>Admin login </span>
              </div>
              <form className="space-y-4 md:space-y-6" onSubmit={handle_form}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Admin email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form_data.email}
                    onChange={handle_change}
                    id="email"
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
                    value={form_data.password}
                    onChange={handle_change}
                    id="password"
                    placeholder="••••••••"
                    className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="encyrption_token"
                    className="block mb-2 text-sm font-medium  text-white"
                  >
                    Encrypted_key
                  </label>
                  <input
                    type="encyrption_token"
                    name="encyrption_token"
                    id="encyrption_token"
                    value={form_data.encyrption_token}
                    onChange={handle_change}
                    placeholder="c%7903Kmc98cksd"
                    className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
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

export default AdminLogin;
