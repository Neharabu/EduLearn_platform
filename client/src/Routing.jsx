import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Loader from "./app/components/loader/Loader";
import Navbar from "./app/components/Navbar";
import UnlockCourseOverlay from "./app/components/UnlockCourseOverlay";
import Login from "./app/components/login";
import LogoutOverlay from "./app/components/LogoutOverlay";
import DeleteCourseOverlay from "./app/components/DeleteCourseOverlay";
import AddTopic from "./app/components/AddTopic";
import AddSectionOverlay from "./app/components/AddSectionOverlay";
import Notfound from "./app/screens/404page/Notfound";
import DeleteBatchOverlay from "./app/components/DeleteBatchOverlay";


//screens
const Landing = lazy(() => import("./app/screens/startup/Landing"));
const Signup = lazy(() => import("./app/screens/startup/Signup"));
const AdminLogin = lazy(() => import("./app/screens/startup/AdminLogin"));
const NewCourse = lazy(() => import("./app/screens/home/NewCourse"));
const CourseStageTwo = lazy(() => import("./app/screens/home/CourseStageTwo"));
const AdminBatch = lazy(() => import("./app/screens/home/AdminBatch"));
const Day = lazy(() => import("./app/screens/home/Day"));
const Students = lazy(() => import("./app/screens/home/Students"));
const AddTopicSection = lazy(() =>
  import("./app/screens/home/AddTopicSection")
);

const Routing = () => {
  const { unlock, login, logout, delete_course, add_topic, add_section } =
    useSelector((e) => e.overlay_state_reducer);
  const { navbar } = useSelector((e) => e.navbar_state_reducer);
  const { loading } = useSelector((e) => e.loading_state_reducer);
  const { user } = useSelector((e) => e.user_state_reducer);
  const { auth } = useSelector((e) => e.auth_state_reducer);
  const { able } = useSelector((e) => e.delete_batch_state_reducer);


  console.log(unlock)
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        {navbar ? <Navbar /> : ""}
        {login ? <Login /> : ""}
        {unlock.able ? <UnlockCourseOverlay /> : ""}
        {logout ? <LogoutOverlay /> : ""}
        {loading ? <Loader /> : ""}
        {auth && user?.role==="admin" &&     delete_course.able ? <DeleteCourseOverlay /> : ""}
        {   auth && user?.role==="admin" &&  add_topic ? <AddTopic /> : ""}
        { auth && user?.role==="admin" && add_section.able ? <AddSectionOverlay /> : ""}
        {auth && able ? <DeleteBatchOverlay/> :''}
        <Routes>
          <Route path="/" element={!unlock.able ? <Landing /> :<Notfound />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/new/course" element={<NewCourse />} />
          <Route path="/admin/batch/:id" element={< AdminBatch/>} />
          <Route path="/day/:id" element={< Day/>} />
          <Route path="/students" element={<Students/>} />
          <Route path="*" element={<Notfound />} />
          {!add_topic ? (
            <Route path="/new/course/update/:id" element={<CourseStageTwo />} />
          ) : (
            ""
          )}
          {  !add_section.able ? (
            <Route path="/course/topic/:id" element={<AddTopicSection />} />
          ) : (
            ""
          )}
          
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routing;
