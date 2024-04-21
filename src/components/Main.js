// Import components here

// HOME IMPORTS
import Header from "./Header";
import Home from "./Home";
import Pages from "./Pages";
import About from "./About";
import Contact from "./Contact";
import FAQ from "./FAQ";
import Footer from "./Footer";

// TEACHER IMPORTS
import TeacherDetails from "./teacher/TeacherDetails";
//auth
import TeacherRegister from "./teacher/TeacherRegister";
import TeacherLogin from "./teacher/TeacherLogin";
import TeacherForgotPassword from "./teacher/TeacherForgotPassword";
import TeacherResetPassword from "./teacher/TeacherResetPassword";
import TeacherChangePassword from "./teacher/TeacherChangePassword";
import TeacherOTP from "./teacher/TeacherOTP";
import TeacherLogout from "./teacher/TeacherLogout";

import TeacherCourses from "./teacher/TeacherCourses";
import TeacherSkillCourses from "./teacher/TeacherSkillCourses";
import AddCourse from "./teacher/AddCourse";
import EditCourse from "./teacher/EditCourse";
import AddStrand from "./teacher/AddStrand";
import AddStudyMaterial from "./teacher/AddStudyMaterial";
import EditStrand from "./teacher/EditStrand";
import MyStudents from "./teacher/MyStudents";
import CourseEnrolledStudents from "./teacher/CourseEnrolledStudents";

import TeacherDashboard from "./teacher/TeacherDashboard";
import TeacherProfile from "./teacher/TeacherProfile";
import TeacherSideBar from "./teacher/TeacherSideBar";
import PopularTeachers from "./teacher/PopularTeachers";

//ASSIGNMENT
//teacher side
import AddAssignment from "./assignment/teacher_assignment/AddAssignment";
import TeacherViewStudentAssignment from "./assignment/teacher_assignment/TeacherViewStudentAssignment";
//student side
import StudentAssignments from "./assignment/student_assignment/StudentAssignments.js";

//QUIZ
// teacher dashboard
import EditQuiz from "./quiz/teacher_quiz/EditQuiz";
import AddQuiz from "./quiz/teacher_quiz/AddQuiz";
import AddQuestion from "./quiz/teacher_quiz/AddQuestion";
import TeacherQuiz from "./quiz/teacher_quiz/TeacherQuiz";
import QuizQuestions from "./quiz/teacher_quiz/QuizQuestions";
import AssignQuiz from "./quiz/teacher_quiz/AssignQuiz";
import QuizCandidates from "./quiz/teacher_quiz/QuizCandidates";
// student portal
import CourseQuizList from "./quiz/student_quiz/CourseQuizList";
import TakeQuiz from "./quiz/student_quiz/TakeQuiz";

// COURSES
import CourseCategories from "./courses/CourseCategories";
import CategoryCourses from "./courses/CategoryCourses";
import CourseDetails from "./courses/CourseDetails";
import CourseStrands from "./courses/CourseStrands";
import CourseStudyMaterials from "./courses/CourseStudyMaterials";
import StudentStudyMaterials from "./courses/StudentStudyMaterials";
import LatestCourses from "./courses/LatestCourses";
import PopularCourses from "./courses/PopularCourses";
import SearchedCourses from "./courses/SearchedCourses";

// STUDENT IMPORTS
import StudentDetails from "./student/StudentDetails";

import StudentRegister from "./student/StudentRegister";
import StudentLogin from "./student/StudentLogin";
import StudentForgotPassword from "./student/StudentForgotPassword";
import StudentResetPassword from "./student/StudentResetPassword";
import StudentChangePassword from "./student/StudentChangePassword";
import StudentOTP from "./student/StudentOTP";
import StudentLogout from "./student/StudentLogout";

import StudentProfile from "./student/StudentProfile";
import MyTeachers from "./student/MyTeachers";
import EnrolledCourses from "./student/EnrolledCourses";
import FavoriteCourses from "./student/FavoriteCourses";
import RecommendedCourses from "./student/RecommendedCourses";
import StudentPortal from "./student/StudentPortal";
import StudentSideBar from "./student/StudentSideBar";
//MPESA
import LipaNaMpesaForm from "./MPESA/LipaNaMpesaForm";
//ROUTER
import { Routes as Switch, Route } from "react-router-dom";

function Main() {
  return (
    <div className="App">
      <Header />

      <Switch>
        {/* ==========================Home routes=============================== */}
        <Route path="/" element={<Home />} />
        <Route path="/page/:page_id/:page_slug" element={<Pages />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<FAQ />} />

        <Route path="/course_details/:course_id" element={<CourseDetails />} />
        <Route
          path="/teacher_details/:teacher_id"
          element={<TeacherDetails />}
        />
        <Route
          path="/student_details/:student_id"
          element={<StudentDetails />}
        />

        {/* =======================Teacher Routes===============================*/}
        <Route path="/teacher_register" element={<TeacherRegister />} />
        <Route path="/verify_teacher/:teacher_id" element={<TeacherOTP />} />
        <Route path="/teacher_login" element={<TeacherLogin />} />
        <Route
          path="/teacher_change_password"
          element={<TeacherChangePassword />}
        />
        <Route
          path="/teacher_forgot_password_email"
          element={<TeacherForgotPassword />}
        />
        <Route
          path="/teacher_reset_password/:teacher_id"
          element={<TeacherResetPassword />}
        />
        <Route path="/teacher_profile" element={<TeacherProfile />} />
        <Route path="/teacher_dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher_side_bar" element={<TeacherSideBar />} />
        <Route path="/my_students" element={<MyStudents />} />
        <Route
          path="/course_enrolled_students/:course_id"
          element={<CourseEnrolledStudents />}
        />
        <Route path="/teacher_courses" element={<TeacherCourses />} />
        <Route path="/add_course" element={<AddCourse />} />
        <Route path="/edit_course/:course_id" element={<EditCourse />} />
        <Route path="/add_strand/:course_id" element={<AddStrand />} />
        <Route
          path="/add_study_material/:course_id"
          element={<AddStudyMaterial />}
        />
        <Route path="/edit_strand/:strand_id" element={<EditStrand />} />
        {/* <Route path="/edit_study_material/:material_id" element={<EditStudyMaterial />} /> */}
        <Route
          path="/teacher_skill_courses/:skill_name/:teacher_id"
          element={<TeacherSkillCourses />}
        />
        <Route path="/popular_teachers" element={<PopularTeachers />} />
        <Route path="/teacher_logout" element={<TeacherLogout />} />

        {/* ========================Quiz Routes============================= */}
        {/* teacher dashboard */}
        <Route path="/add_quiz" element={<AddQuiz />} />
        <Route path="/teacher_quiz" element={<TeacherQuiz />} />
        <Route path="/edit_quiz/:quiz_id" element={<EditQuiz />} />
        <Route path="/add_question/:quiz_id" element={<AddQuestion />} />
        <Route path="/quiz_questions/:quiz_id" element={<QuizQuestions />} />
        <Route path="/assign_quiz/:course_id" element={<AssignQuiz />} />
        <Route path="/quiz_candidates/:quiz_id" element={<QuizCandidates />} />
        {/* student portal */}
        <Route path="/course_quiz/:course_id" element={<CourseQuizList />} />
        <Route path="/take_quiz/:quiz_id" element={<TakeQuiz />} />
        {/* ============================COURSES================================ */}
        <Route
          path="/courses/:category_id/:category_slug"
          element={<CategoryCourses />}
        />
        <Route path="/course_categories" element={<CourseCategories />} />
        <Route path="/latest_courses" element={<LatestCourses />} />
        <Route path="/course_strands/:course_id" element={<CourseStrands />} />
        <Route
          path="/course_study_materials/:course_id"
          element={<CourseStudyMaterials />}
        />
        <Route
          path="/student_study_materials/:course_id"
          element={<StudentStudyMaterials />}
        />
        <Route path="/popular_courses" element={<PopularCourses />} />
        <Route path="/search/:searched_string" element={<SearchedCourses />} />

        {/* ========================Student Routes============================= */}

        <Route path="/student_register" element={<StudentRegister />} />
        <Route path="/student_login" element={<StudentLogin />} />
        <Route path="/verify_student/:student_id" element={<StudentOTP />} />
        <Route path="/student_profile" element={<StudentProfile />} />
        <Route
          path="/student_forgot_password_email"
          element={<StudentForgotPassword />}
        />
        <Route
          path="/student_reset_password/:student_id"
          element={<StudentResetPassword />}
        />
        <Route
          path="/student_change_password"
          element={<StudentChangePassword />}
        />
        <Route path="/student_portal" element={<StudentPortal />} />
        <Route path="/side_bar" element={<StudentSideBar />} />
        <Route path="/my_tutors" element={<MyTeachers />} />
        <Route path="/enrolled_courses" element={<EnrolledCourses />} />
        <Route path="/favorite_courses" element={<FavoriteCourses />} />
        <Route path="/recommended_courses" element={<RecommendedCourses />} />
        {/* ========================Assignment Routes============================= */}
        <Route
          path="/add_assignment/:student_id/:teacher_id"
          element={<AddAssignment />}
        />
        <Route
          path="/teacher_view_assignment/:student_id/:teacher_id"
          element={<TeacherViewStudentAssignment />}
        />
        <Route path="/student_assignments" element={<StudentAssignments />} />

        <Route path="/student_logout" element={<StudentLogout />} />
        {/* MPESA ROUTES */}
        <Route path="/mpesa" element={<LipaNaMpesaForm />} />
      </Switch>
      <Footer />
    </div>
  );
}
export default Main;
