/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

const MyCourse = ({course}) => {
    const {title,image,description,_id} = course
    const dispatch = useDispatch()
  return (
    <div  className=" relative phone:w-3/4  h-[15rem] phone:h-[17rem] my-3 mx-4 morphcard border p-3 border-gray-200 rounded-lg shadow  flex flex-col justify-between">
   

   <button onClick={()=> dispatch({
              type: "overlay_data",
              payload: {
                login: false,
                unlock: {able:false,id:''},
                contact: false,
                logout: false,
                delete_course: { able: true, id: _id },
              },
            })} type="button" className="text-red-700 absolute border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none bottom-2 right-2 focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center ">
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

 
</button>

    <img className="rounded-t-lg object-fill w-full h-1/2" src={image} alt="" />

    <div className="p-1 flex flex-col h-auto justify-between">
      <Link to={`/new/course/update/${_id}`} href="#">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-100 ">
          {title}
        </h5>
      </Link>
      <p className="mb-3 font-normal text-sm text-gray-500 ">
        {description.slice(0, 22)}...
      </p>
    
    </div>
  </div>
  )
}

export default MyCourse