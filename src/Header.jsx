import logo from "./assets/logo.png";
import { userEnrolledCourses } from "./EnrolledCourses";

export default function Header() {
  const { enrolledCourses} = userEnrolledCourses();
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">Classes Enrolled: {enrolledCourses.length}</div>
    </div>
  );
}
