import { useState } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";

const AddTopic = () => {
  const course_id = location.pathname.split("/")[4];
  const [title, set_title] = useState("");
  const [description, set_description] = useState("");
  const dispatch = useDispatch();

  const form_handler = async (e) => {
    e.preventDefault();
    console.log(title,description)
    dispatch({ type: "loading_data", payload: true });
    await Axios.post(`/api/v1/topic`, {course_id, title, description })
      .then((res) => {
       console.log(res)
        if(res.data.success===true){
        console.log(res)
        alert('created topic')
        dispatch({
            type:'overlay_data',
            payload:{
                login: false,
                unlock: {able:false,id:''},
                contact: false,
                logout:false,
                delete_course:{
                  able:false,
                  id:""
                },
                add_topic:false
            }
        })
      }}
      )
      .catch((err) => console.log(err))
      .finally(() => dispatch({ type: "loading_data", payload: false }));
  };

  return (
    <section className="w-full z-[999] h-screen fixed ">
      <div className="flex w-full h-full justify-center items-center relative ">
        <div    onClick={()=>dispatch({type:"overlay_data",payload:{
            login: false,
            unlock: {able:false,id:''},
            contact: false,
            logout:false,
            delete_course:{
              able:false,
              id:""
            },
            add_topic:false
           }})} className="flex w-full absolute h-full bg-black opacity-70 z-10"></div>

        <form
          onSubmit={form_handler}
          className="z-20 morphcard phone:w-4/5 w-1/3 h-auto p-5"
        >
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Topic title{" "}
            </label>
            <input
              value={title}
              onChange={(e) => set_title(e.target.value)}
              type="text"
              id="email"
              className=" text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Aws lamda working "
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
             Description
            </label>
            <input
              value={description}
              onChange={(e) => set_description(e.target.value)}
              type="text"
              id="password"
              placeholder="write topic description"
              className=" text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddTopic;
