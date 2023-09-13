function TeacherLogout() {
  localStorage.removeItem("teacherLoginStatus");
  window.location.href = "/teacher_login";
  return <div></div>;
}
export default TeacherLogout;
