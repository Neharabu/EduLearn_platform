import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Student from "../../components/Student";
import toast,{Toaster} from 'react-hot-toast'

const Students = () => {
  const { auth } = useSelector((e) => e.auth_state_reducer);
  const { user } = useSelector((e) => e.user_state_reducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [students,set_students] = useState([])
  const[selected_ids,set_selected_ids] = useState([])
  const fetch_students = async () => {
    dispatch({ type: "loading_data", payload: true });
    await Axios.get("/api/v1/batch/students")
      .then((res) => {
        
        if(res?.data?.students){
            set_students(res.data.students)
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: "loading_data", payload: false });
      });
  };




  const all_id_selection=async()=>{
toast.success('All Students got selected')
const all_ids = students.map((e)=>e._id)
set_selected_ids(all_ids)

  }

const activate_all=async()=>{
if(selected_ids.length>0){
    dispatch({type:'loading_data',payload:true})
await Axios.put('/api/v1/activate',{students:selected_ids})
.then((res)=>{
    console.log(res)
    if(res.data.success==true){
        dispatch({type:'loading_data',payload:false})
        alert('All students got activated')
        navigate('/')
    }
}).catch((err)=>{
    toast.error(err.response.data.message || err.message)
}).finally(()=>{
    dispatch({type:'loading_data',payload:false})
})

}
else{
    toast.error('No selected Students')
}
}

  useEffect(() => {
    if (auth && user.role === "admin") {
      fetch_students();
    } else {
      navigate("/");
    }
  }, []);

  return (
<>
<div className="flex w-full h-24"></div>
<section className="w-full flex flex-col justify-center items-center h-screen">
    <div>
        <Toaster/>
    </div>

<div className="flex bg-gray-500 items-center justify-between px-5 rounded-lg w-2/3">
<div className="flex bg-gray-500 rounded-md p-3">
    <div className="flex items-center h-5">
        <input id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={(e)=>{
            if(e.target.checked){
                all_id_selection()
            }
        }}/>
    </div>
    <div className="ml-2 text-sm">
        <label htmlFor="helper-checkbox" className="font-medium text-gray-900 dark:text-gray-300">Click here to select all studnets</label>
        <p id="helper-checkbox-text" className="text-xs font-normal text-gray-900 dark:text-gray-300">you can also Activate a specific student</p>
    </div>
</div>

<button onClick={activate_all} type="button" className="py-1 h-3/4 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 ">Activate all</button>

</div>
      <div className="gap-3 flex w-4/5 h-5/6 flex-col items-center overflow-y-scroll">
{
    students && students.map((e)=>  <Student key={e._id} student={e}/> )
}


      </div>
    </section>
</>
  );
};

export default Students;
