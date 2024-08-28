import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Axios from "axios";

const AddTopicSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [topic, set_topic] = useState({});

  const fetch_topic = async () => {
    dispatch({ type: "loading_data", payload: true });
    await Axios.get(`/api/v1/admin/topic/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.success == true) {
          set_topic(res.data.topic);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch({ type: "loading_data", payload: false }));
  };

  useEffect(() => {
    fetch_topic();
  }, []);


  
  return (
    <section className="flex overflow-y-scroll gap-5 items-center flex-col w-full h-screen">
      <div className="flex w-full h-24"></div>
      <div className="flex w-3/4 morphcard  justify-evenly items-center gap-4 p-5">
        <div className="h-full w-1/5  flex justify-center items-center">
          <div className="h-16 w-16 bg-gray-700 justify-center text-white items-center flex rounded-full cursor-pointer border">
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
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
          </div>
        </div>
        <div className="flex gap-2 flex-col items-start">
          <span className="text-white font-bold font-mont text-2xl ">
            {topic.title}
          </span>
          <span className="text-gray-300">{topic.description}</span>
        </div>
      </div>
      <div className="flex w-5/6 flex-warp overflow-y-scroll h-auto">
        {topic?.sections &&
          topic?.sections.map((e) => (
            <div
              key={e._id}
              className="flex  w-44 flex-col px-4 h-32 border-purple-600 bg-gray-500  m-2  rounded-md p-3"
            >
              <span className="font-mont text-white font-bold">{e?.title.slice(0,12)}</span>
              <span className="text-[12px]">{e?.description.slice(0, 70)}</span>
            </div>
          ))}

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
                  able: true,
                  id: id,
                },
              },
            });
          }}
          className="flex morphcard justify-center flex-col cursor-pointer text-white items-center w-32 h-24 m-4 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.1}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span className="text-gray-200 text-[12px]"> New Topic Section</span>
        </div>
      </div>
    </section>
  );
};

export default AddTopicSection;
