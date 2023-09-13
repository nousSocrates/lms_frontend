function StudentLogout() {
    localStorage.removeItem("studentLoginStatus");
    window.location.href = "/student_login";
    return <div></div>;
  }
  export default StudentLogout;
  