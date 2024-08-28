import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import MyCourse from "../../components/MyCourse";

const NewCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((e) => e.user_state_reducer);
  const [form_data, set_form_data] = useState({
    title: "",
    image: "",
    description: "",
  });
  const [mycourses,set_mycourses] = useState([])

  const handle_change = (event) => {
    const { name, value } = event.target;
    set_form_data((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const fetch_all_courses = async() => {
    dispatch({ type: "loading_data", payload: true });
await Axios.get('/api/v1/mycourses')
.then(res=>{
console.log(res)
if(res.data.success===true){
  set_mycourses(res.data.courses)
}
}).catch(err=>{
  console.log(err)
  toast.error(err?.response?.data?.message || err.message)
}).finally(()=>{
  dispatch({ type: "loading_data", payload: false });
})

  };

  const create_course = async (e) => {
    e.preventDefault();
    console.log(form_data);
    dispatch({ type: "loading_data", payload: true });
    await Axios.post("/api/v1/new/course", form_data)
      .then(async (res) => {
        console.log(res);
        if (res.data.success === true) {
          toast.success("Created Successfully 👍");
          await fetch_all_courses();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || err?.message);
      })
      .finally(() => {
        dispatch({ type: "loading_data", payload: false });
        set_form_data({
          title: "",
          image: "",
          description: "",
        })
      });
  };

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
      
    }

    if(user?.role === 'admin'){
  
      fetch_all_courses();
    }
  }, []);

  return (
    <section className="w-full items-center   overflow-y-scroll hero h-screen flex flex-col">
      <div>
        <Toaster />
      </div>
      <div className="flex w-full h-24 p-5">


      </div>

      <form
        className="flex w-5/6 gap-5 p-5 morphcard flex-col"
        onSubmit={create_course}
      >
        <div className="relative z-0">
          <input
            type="text"
            id="title"
            name="title"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={form_data.title}
            onChange={handle_change}
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_standard"
            className="absolute text-sm text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Course Name
          </label>
        </div>
        <div className="relative z-0">
          <input
            type="text"
            id="description"
            name="description"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={form_data.description}
            onChange={handle_change}
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_standard"
            className="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Course Description
          </label>
        </div>
        <div className="relative z-0">
          <input
            type="text"
            id="image"
            name="image"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={form_data.image}
            onChange={handle_change}
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_standard"
            className="absolute text-sm text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Course Image
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create course
        </button>
      </form>

      <div className="flex justify-start phone:flex-col h-[40%]  items-center w-full  phone:overflow-y-scroll overflow-x-scroll gap-5">
{mycourses && mycourses.map((e)=> <MyCourse key={e._id} course={e}/>)
}

      </div>
    </section>
  );
};

export default NewCourse;
