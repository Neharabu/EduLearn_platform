import{b as p,a as w,u as h,j as e,A as i,r as g}from"./index-005c59a5.js";const v=({topic:s,index:t,batch_day:l})=>{console.log(t+1),console.log(l);const c=p(),n=w(),{user:r}=h(o=>o.user_state_reducer),d=async()=>{r.role==="admin"&&(n({type:"loading_data",payload:!0}),await i.put("/api/v1/day/topic").then(o=>{n({type:"user_data",payload:o.data.user}),n({type:"loading_data",payload:!1}),location.reload()}).catch(o=>{console.log(o)}))},x=()=>{n({type:"day_data",payload:s._id}),c(`/day/${t+1}`)};return e.jsxs("div",{className:"w-[93%] p-4 bg-gray-700 rounded-lg flex gap-4",children:[e.jsx("div",{className:"w-1/4 flex justify-center items-center",children:e.jsx("div",{className:"flex  w-12 h-12 bg-gray-400 rounded-full border items-center justify-center text-white",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"})})})}),e.jsxs("div",{className:"flex w-3/4 justify-between items-center",children:[e.jsxs("div",{className:"flex w-2/3 flex-col",children:[e.jsx("span",{className:"text-white font-bold text-xl font-mont",children:s==null?void 0:s.title}),e.jsx("span",{className:"text-gray-400 font-medium",children:s==null?void 0:s.description})]}),e.jsx("div",{className:"flex",children:t+1<=l?e.jsxs("button",{onClick:x,type:"button",className:"text-green-500 flex gap-3 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800",children:["View",e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"})})]}):r.role==="admin"?e.jsxs("button",{onClick:d,type:"button",className:"text-white gap-2 bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 ",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2.1,stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"})}),"Unlock course"]}):e.jsxs("button",{type:"button",className:"text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"})}),"Day Locked"]})})]})]})},b=()=>{var u,m;const s=w(),{user:t}=h(a=>a.user_state_reducer),{auth:l}=h(a=>a.auth_state_reducer),c=p(),[n,r]=g.useState({}),d=async()=>{t!=null&&t.current_batch?x():c("/")},x=async()=>{t.role==="admin"?(s({type:"loading_data",payload:!0}),await i.get(`/api/v1/course/${t.current_batch.current_course}`).then(a=>{console.log(a),a.data.success===!0&&r(a.data.course)}).catch(a=>console.log(a)).finally(()=>{s({type:"loading_data",payload:!1})})):(s({type:"loading_data",payload:!0}),await i.get(`/api/v1/my/course/${t.current_batch.current_course}`).then(a=>{console.log(a),a.data.success===!0&&(r(a.data.course),o())}).catch(a=>console.log(a)).finally(()=>{s({type:"loading_data",payload:!1})}))},o=async()=>{s({type:"loading_data",payload:!0}),await i.get("/api/v1/me").then(a=>{a.data.user?s({type:"user_data",payload:a.data.user}):alert("something went wrong")}).catch(a=>{console.log(a)}).finally(()=>{s({type:"loading_data",payload:!1})})};return g.useEffect(()=>{l?d():c("/")},[]),e.jsx(e.Fragment,{children:e.jsxs("section",{className:"w-full pt-32 phone:flex-col phone:items-center flex h-screen gap-4 justify-center ",children:[e.jsxs("div",{className:"flex w-[22%] overflow-y-scroll phone:w-[80%] flex-col h-auto p-5 justify-between morphcard  gap-2",children:[e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{children:[e.jsxs("span",{className:"font-mont text-sm font-bold flex text-white",children:[e.jsx("span",{className:"text-gray-300 text-[11px]",children:"Batch"}),":"," ",(u=t==null?void 0:t.current_batch)==null?void 0:u.batch]}),e.jsxs("span",{className:"font-mont font-bold text-sm flex text-white",children:[e.jsx("span",{className:"text-gray-300 text-[11px]",children:"Course"}),":"," ",(m=t==null?void 0:t.current_batch)==null?void 0:m.course]})]}),e.jsx("img",{src:n.image,className:"w-60 rounded-md",alt:""}),e.jsxs("div",{className:"flex flex-col ",children:[e.jsx("span",{className:"text-xl font-mont font-bold text-white",children:n.title}),e.jsx("span",{className:"font-mont text-gray-400 ",children:n.description}),e.jsx("span",{className:"text-green-600 mt-2 font-medium text-[12px]",children:"You have this as active batch."})]})]}),e.jsx("div",{className:"flex flex-col justify-between h-auto",children:e.jsx("div",{className:"w-full justify-start flex items-start",children:(t==null?void 0:t.role)==="admin"?e.jsx("button",{onClick:()=>{s({type:"delete_batch_data",payload:{able:!0,id:t.current_batch._id}})},type:"button",className:"text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-4 h-4",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"})})}):""})})]}),e.jsx("div",{className:" flex flex-col items-end overflow-y-scroll phone:items-center  phone:w-[90%] gap-2 w-[70%] h-[95%]",children:(n==null?void 0:n.topics)&&n.topics.map((a,y)=>{var f;return e.jsx(v,{batch_day:(f=t==null?void 0:t.current_batch)==null?void 0:f.batch_period,topic:a,index:y},a._id)})})]})})};export{b as default};
