import { useState, useEffect, useRef } from "react";
import Student from "./Student";

function App() {
  //hold students
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);
  const query = useRef("");

  //fetch from api on page load
  useEffect(() => {
    fetch("https://api.hatchways.io/assessment/students")
      .then((res) => res.json())
      .then((final) => {
        setStudents(final.students);
        setData(final.students);
      })
      .catch((error) => console.log("Error: ", error));
  }, [1]);

  //filter students based on searchbar
  const updateStudents = () => {
    let result = [];

    if (data) {
      result = data.filter((student) => {
        return (
          student.firstName.toUpperCase() +
          " " +
          student.lastName.toUpperCase()
        ).includes(query.current.value.toUpperCase());
      });
    }

    setStudents(result);
  };

  return (
    <div className="App">
      <div className="content">
        <input
          ref={query}
          type="search"
          className="query"
          placeholder="Search by Name"
          onChange={updateStudents}
        />
        {students.length ? (
          students.map((student) => {
            return (
              <div>
                <Student key={student.id} student={student}></Student>
                {/* Remove last hr using conditional statement */}
                {student.id != students.length && <hr />}
              </div>
            );
          })
        ) : (
          <p>No Students Found</p>
        )}
      </div>
    </div>
  );
}

export default App;
