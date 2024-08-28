import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";

const AddSectionOverlay = () => {
  const dispatch = useDispatch();
  const [title, set_title] = useState("");
  const [description, set_description] = useState("");
  const [image, set_image] = useState("");
  const { add_section } = useSelector((e) => e.overlay_state_reducer);

  const handle_form = async (e) => {
    e.preventDefault();
    dispatch({ type: "loading_data", paylod: true });
    const section = {
      title,
      image,
      description,
    };

    await Axios.put(`/api/v1/new/section/${add_section.id}`, section)
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          alert("added section successfully");
          dispatch({ type: "loading_data", paylod: false });
          dispatch({
            type: "overlay_data",
            payload: {
              login: false,
              unlock: {able:false,id:''},
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
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch({ type: "loading_data", paylod: false });
      });
  };



  return (
    <section className="w-full z-[199] h-screen fixed">
      <div className="flex justify-end flex-col  items-center h-full relative ">
        <div
          onClick={() => {
            dispatch({
              type: "overlay_data",
              payload: {
                login: false,
                unlock: {able:false,id:''},
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
          className="flex w-full bg-black h-full absolute z-10 opacity-70"
        ></div>
        <form
          onSubmit={handle_form}
          className="flex mb-5 items-center flex-col w-2/3 z-20 phone:w-5/6 h-auto p-5 bg-gray-900 rounded-md border"
        >
          <div className="mb-6 w-5/6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Section Name
            </label>
            <input
              type="text"
              id="email"
              className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Why AWs so famous ?"
              value={title}
              onChange={(e) => set_title(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 w-5/6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Section Image
            </label>
            <input
              type="text"
              id="email"
              className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://s3image/"
              value={image}
              onChange={(e) => set_image(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 w-5/6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Section Description
            </label>
            <textarea
              type="text"
              id="email"
              className=" border text-sm rounded-lg h-44 resize-none  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder=" AWs so famous... "
              value={description}
              onChange={(e) => set_description(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="text-white w-5/6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
          >
            Submit section
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddSectionOverlay;
