import{c as p,b as h,a as f,u as o,r as l,j as e,L as m,A as g}from"./index-20a7d0ca.js";const j=()=>{const{id:c}=p(),r=h(),a=f(),{user:n}=o(s=>s.user_state_reducer),{auth:i}=o(s=>s.auth_state_reducer),[t,d]=l.useState({}),u=async()=>{a({type:"loading_data",payload:!0}),await g.get(`/api/v1/course/${c}`).then(s=>{console.log(s.data.course),s.data.success===!0&&d(s.data.course)}).catch(s=>console.log(s)).finally(()=>{a({type:"loading_data",payload:!1})})};return l.useEffect(()=>{n.role==="admin"&&i?u():r("/")},[]),e.jsxs("section",{className:"w-full h-screen gap-4 flex flex-col p-5 items-center",children:[e.jsx("div",{className:"flex w-3/4  h-24"}),e.jsxs("div",{className:"flex phone:flex-col phone:w-5/6 w-3/4 gap-5 morphcard h-auto p-5",children:[e.jsx("img",{src:t.image,className:"w-44 rounded-lg",alt:""}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("span",{className:"text-white font-mont text-xl",children:t.title}),e.jsx("span",{className:"text-gray-400 font-mont ",children:t.description})]})]}),e.jsxs("div",{className:"flex w-4/5 h-3/4  pt-5 overflow-y-scroll flex-wrap",children:[(t==null?void 0:t.topics)&&t.topics.map((s,x)=>e.jsxs(m,{to:`/course/topic/${s._id}`,className:"flex h-16 w-16 topics justify-center items-center rounded-full m-4 text-white flex-col hover:text-gray-600 cursor-pointer",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2.1,stroke:"currentColor",className:"w-6  h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"})}),e.jsxs("span",{className:"text-[11px]",children:["Day",x+1]})]},s._id)),e.jsx("button",{onClick:()=>a({type:"overlay_data",payload:{login:!1,unlock:{able:!1,id:""},contact:!1,logout:!1,delete_course:{able:!1,id:""},add_topic:!0}}),type:"button",className:"text-white m-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm -center  items-center p-2 flex justify-center   w-16 h-16 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"})})})]})]})};export{j as default};
