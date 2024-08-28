import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import Section from "../../components/Section";

const Day = () => {
  const { user } = useSelector((e) => e.user_state_reducer);
  const { id } = useSelector((e) => e.day_state_reducer);
  const index = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [day, set_day] = useState({});

  const fetch_day = async () => {
  if(user.role ==="admin"){
    dispatch({ type: "loading_data", payload: true });
    await Axios.get(`/api/v1/topic?id=${id}&index=${index.id}`)
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          set_day(res?.data?.topic);
          console.log(res.data.topic.sections);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: "loading_data", payload: false });
      });
  }
  else{
    dispatch({ type: "loading_data", payload: true });
    await Axios.get(`/api/v1/std/topic?id=${id}&index=${index.id}`)
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          set_day(res?.data?.topic);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: "loading_data", payload: false });
      });
  }
  };

  useEffect(() => {
    if (index.id <= user?.current_batch?.batch_period) {
      console.log("yup");
      fetch_day();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="flex w-full h-12"></div>
      <section className="w-full h-screen flex justify-center items-center">
        <div className="flex w-5/6 h-5/6 overflow-y-scroll flex-col gap-5  ">
          {day?.sections &&
            day.sections.map((e, index) => <Section key={index} topic={e} />)}
        </div>
      </section>
    </>
  );
};

export default Day;
