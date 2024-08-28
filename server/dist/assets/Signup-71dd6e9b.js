import{a as p,u as b,b as x,r as i,j as e,L as d,A as f}from"./index-005c59a5.js";import{I as y,_ as w}from"./index-7355d82d.js";const _=()=>{const r=p(),{auth:c}=b(t=>t.auth_state_reducer),o=x(),[s,n]=i.useState({email:"",password:"",batch_id:"",course_id:""}),l=t=>{const{name:a,value:h}=t.target;n(g=>({...g,[a]:h}))},u=async t=>{t.preventDefault(),console.log(s),r({type:"loading_data",payload:!0}),await f.post("/api/v1/register/student",s).then(a=>{console.log(a),r({type:"loading_data",payload:!1}),a.data.success===!0&&(alert("created account successfully"),o("/"))}).catch(a=>{w.error(a.response.data.message||a.message)}).finally(()=>{r({type:"loading_data",payload:!1})})},m=()=>{r({type:"navbar_data",payload:{navbar:!1}}),r({type:"overlay_data",payload:{login:!1,unlock:{able:!1,id:""},contact:!1,logout:!1,delete_course:{able:!1,id:""}}})};return i.useEffect(()=>{c&&o("/"),m()},[]),e.jsxs("section",{className:"fixed w-full z-[99] overflow-y-scroll hero h-screen",children:[e.jsx("div",{children:e.jsx(y,{})}),e.jsx(d,{to:"/admin/login",className:"flex absolute top-4 right-4 z-20 items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 ",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"})})}),e.jsx("div",{className:" flex w-full relative overflow-y-scroll h-full justify-center items-center",children:e.jsx("div",{className:"flex z-20 w-1/2  overflow-y-scroll phone:w-[93%] flex-col justify-center items-center",children:e.jsx("div",{className:"w-full bg-gray-900 rounded-lg shadow dark:border md:mt-0  xl:p-0 ",children:e.jsxs("div",{className:"p-6 space-y-4 md:space-y-6 sm:p-8",children:[e.jsxs("div",{className:"text-xl flex font-bold  items-center gap-5 leading-tight tracking-tight  md:text-2xl text-white",children:[e.jsx("img",{src:"/logo.png",className:"w-12",alt:""}),e.jsx("span",{children:"Sign up "})]}),e.jsxs("form",{onSubmit:u,className:"space-y-4 md:space-y-6",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block mb-2 text-sm font-medium text-white",children:"Your email"}),e.jsx("input",{type:"email",name:"email",id:"email",value:s.email,onChange:l,className:"border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500",placeholder:"name@company.com",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",className:"block mb-2 text-sm font-medium  text-white",children:"Password"}),e.jsx("input",{type:"password",name:"password",id:"password",value:s.password,onChange:l,placeholder:"••••••••",className:"border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"batch_id",className:"block mb-2 text-sm font-medium  text-white",children:"Batch id"}),e.jsx("input",{type:"text",name:"batch_id",id:"batch_id",value:s.batch_id,onChange:l,placeholder:"ak0922",className:"border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"course_id",className:"block mb-2 text-sm font-medium  text-white",children:"Course id"}),e.jsx("input",{type:"text",name:"course_id",id:"course_id",value:s.course_id,onChange:l,placeholder:"akfullstach096",className:"border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500",required:!0})]}),e.jsx("button",{type:"submit",className:"w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",children:"Sign up"}),e.jsxs("p",{className:"text-sm font-light text-gray-500 dark:text-gray-400",children:["Don’t have an account yet?"," ",e.jsx(d,{to:"/",className:"font-medium text-gray-500 hover:underline ",children:"Login"})]})]})]})})})})]})};export{_ as default};
