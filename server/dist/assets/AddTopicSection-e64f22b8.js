import{c as r,a as n,r as o,j as e,A as d}from"./index-4e7f61e2.js";const p=()=>{const{id:a}=r(),l=n(),[t,c]=o.useState({}),i=async()=>{l({type:"loading_data",payload:!0}),await d.get(`/api/v1/admin/topic/${a}`).then(s=>{console.log(s),s.data.success==!0&&c(s.data.topic)}).catch(s=>console.log(s)).finally(()=>l({type:"loading_data",payload:!1}))};return o.useEffect(()=>{i()},[]),e.jsxs("section",{className:"flex overflow-y-scroll gap-5 items-center flex-col w-full h-screen",children:[e.jsx("div",{className:"flex w-full h-24"}),e.jsxs("div",{className:"flex w-3/4 morphcard  justify-evenly items-center gap-4 p-5",children:[e.jsx("div",{className:"h-full w-1/5  flex justify-center items-center",children:e.jsx("div",{className:"h-16 w-16 bg-gray-700 justify-center text-white items-center flex rounded-full cursor-pointer border",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"})})})}),e.jsxs("div",{className:"flex gap-2 flex-col items-start",children:[e.jsx("span",{className:"text-white font-bold font-mont text-2xl ",children:t.title}),e.jsx("span",{className:"text-gray-300",children:t.description})]})]}),e.jsxs("div",{className:"flex w-5/6 flex-warp overflow-y-scroll h-auto",children:[(t==null?void 0:t.sections)&&(t==null?void 0:t.sections.map(s=>e.jsxs("div",{className:"flex  w-44 flex-col px-4 h-32 border-purple-600 bg-gray-500  m-2  rounded-md p-3",children:[e.jsx("span",{className:"font-mont text-white font-bold",children:s==null?void 0:s.title.slice(0,12)}),e.jsx("span",{className:"text-[12px]",children:s==null?void 0:s.description.slice(0,70)})]},s._id))),e.jsxs("div",{onClick:()=>{l({type:"overlay_data",payload:{login:!1,unlock:{able:!1,id:""},contact:!1,logout:!1,delete_course:{able:!1,id:""},add_topic:!1,add_section:{able:!0,id:a}}})},className:"flex morphcard justify-center flex-col cursor-pointer text-white items-center w-32 h-24 m-4 ",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2.1,stroke:"currentColor",className:"w-8 h-8",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"})}),e.jsx("span",{className:"text-gray-200 text-[12px]",children:" New Topic Section"})]})]})]})};export{p as default};
