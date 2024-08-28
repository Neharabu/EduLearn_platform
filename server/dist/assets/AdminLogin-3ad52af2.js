import{a as f,u as h,b as x,r as c,j as e,L as b,A as m}from"./index-20a7d0ca.js";import{I as w,_ as v}from"./index-560eb102.js";const k=()=>{const t=f(),{auth:u}=h(a=>a.auth_state_reducer),d=x(),[r,p]=c.useState({email:"",password:"",encyrption_token:""}),n=a=>{const{name:s,value:l}=a.target;p(o=>({...o,[s]:l}))},y=async a=>{a.preventDefault(),t({type:"loading_data",payload:!0}),await m.post("/api/v1/login/admin",r).then(s=>{s.data.success===!0&&(t({type:"user_data",payload:s.data.user}),t({type:"auth_data",payload:!0}),d("/"))}).catch(s=>{var l,o;v.error(((o=(l=s==null?void 0:s.response)==null?void 0:l.data)==null?void 0:o.message)||"Internal Server Error")}).finally(()=>{t({type:"loading_data",payload:!1})})},g=()=>{t({type:"navbar_data",payload:{navbar:!1}}),t({type:"overlay_data",payload:{login:!1,unlock:{able:!1,id:""},contact:!1,logout:!1,delete_course:{able:!1,id:""}}})},i=async()=>{t({type:"loading_data",payload:!0}),await m.get("/api/v1/me").then(a=>{a.data.user?(t({type:"user_data",payload:a.data.user}),d("/")):alert("something went wrong")}).catch(a=>{console.log(a)}).finally(()=>{t({type:"loading_data",payload:!1})})};return c.useEffect(()=>{u&&i(),g(),i()},[]),e.jsxs("section",{className:"fixed w-full z-[99] overflow-y-scroll hero h-screen",children:[e.jsx("div",{children:e.jsx(w,{})}),e.jsx("div",{className:" flex w-full relative overflow-y-scroll h-full justify-center items-center",children:e.jsx("div",{className:"flex z-20 w-1/2  overflow-y-scroll phone:w-[93%] flex-col justify-center items-center",children:e.jsx("div",{className:"w-full bg-gray-900 rounded-lg shadow dark:border md:mt-0  xl:p-0 ",children:e.jsxs("div",{className:"p-6 space-y-4 md:space-y-6 sm:p-8",children:[e.jsxs("div",{className:"text-xl flex font-bold  items-center gap-5 leading-tight tracking-tight  md:text-2xl text-white",children:[e.jsx("img",{src:"/logo.png",className:"w-12",alt:""}),e.jsx("span",{children:"Admin login "})]}),e.jsxs("form",{className:"space-y-4 md:space-y-6",onSubmit:y,children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block mb-2 text-sm font-medium text-white",children:"Admin email"}),e.jsx("input",{type:"email",name:"email",value:r.email,onChange:n,id:"email",className:"border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500",placeholder:"name@company.com",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",className:"block mb-2 text-sm font-medium  text-white",children:"Password"}),e.jsx("input",{type:"password",name:"password",value:r.password,onChange:n,id:"password",placeholder:"••••••••",className:"border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"encyrption_token",className:"block mb-2 text-sm font-medium  text-white",children:"Encrypted_key"}),e.jsx("input",{type:"encyrption_token",name:"encyrption_token",id:"encyrption_token",value:r.encyrption_token,onChange:n,placeholder:"c%7903Kmc98cksd",className:"border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500",required:!0})]}),e.jsx("button",{type:"submit",className:"w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",children:"Login"}),e.jsxs("p",{className:"text-sm font-light text-gray-500 dark:text-gray-400",children:["Don’t have an account yet?"," ",e.jsx(b,{to:"/",className:"font-medium text-gray-500 hover:underline ",children:"Login"})]})]})]})})})})]})};export{k as default};
