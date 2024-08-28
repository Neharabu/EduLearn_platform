import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "axios";


const Login = () => {
  const dispatch = useDispatch();
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");

  const handle_submit = async (e) => {
    e.preventDefault();
    dispatch({ type: "loading_data", payload: true });
    await Axios.post("/api/v1/login/student", {
      email,
      password,
    }).then((res) => {
      if (res.data.success == true) {
        dispatch({ type: "loading_data", payload: false })
        dispatch({ type: "user_data", payload: res.data.user });
        dispatch({ type: "auth_data", payload: true });
        alert("logged in");
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
      }
    }).catch((err)=>{
      console.log(err)
alert(err.response.data.message || err.message)
    }).finally(()=>{
      dispatch({ type: "loading_data", payload: false });
    })
  };

  return (
    <section className="fixed w-full z-[99] h-screen">
    
      <div className=" flex w-full relative h-full justify-center items-center">
        <div
          onClick={() =>
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
            })
          }
          className="flex w-full h-full absolute bg-black z-10 opacity-80"
        ></div>
        <div className="flex z-20 w-1/2 phone:w-5/6 justify-center items-center">
          <div className="w-full bg-gray-900 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handle_submit}>
             
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
                    value={email}
                    onChange={(e)=>set_email(e.target.value)}
                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e)=>set_password(e.target.value)}
                    placeholder="••••••••"
                    className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
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

export default Login;
