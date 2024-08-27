import { useState, useEffect } from 'react';

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('/api/courses.json')
    .then(response => response.json())
    .then(data => setCourses(data));
  }, []);

  // handles the search
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Filter
  const filterCourses = courses.filter((course) => {
    return (
      course.courseName.toLowerCase().includes(search.toLowerCase()) ||
      course.courseNumber.toLowerCase(). includes(search.toLowerCase())
    );
  });

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" value={search} onChange={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Courses Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {(filterCourses.map((course, index) => (
            <tr key={index}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button>Enroll</button>
              </td>
            </tr>
              ))
            )}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
