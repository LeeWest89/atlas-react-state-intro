import {createContext, useState, useContext} from 'react';

const CourseContext = createContext()
export const EnrolledCourses = ({ children }) => {
  const [enrolledCourses, setEnrolledCourse] = useState([]);

  const enrolledCourse = (course) => {
    setEnrolledCourse(courses => [...courses, course]);
  };

  const dropCourse = (courseNumber) => {
    setEnrolledCourse(courses => courses.filter(course => course.courseNumber !== courseNumber));
  };

  return (
    <CourseContext.Provider value={{ enrolledCourses, enrolledCourse, dropCourse}}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);