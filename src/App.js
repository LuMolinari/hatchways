import React, { PureComponent } from "react";
import Student from "./Student";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.updateStudents = this.updateStudents.bind(this);
    this.updateTags = this.updateTags.bind(this);

    this.state = {
      data: [],
      students: [],
      tagFilter: "",
    };
  }

  componentDidMount() {
    fetch("https://api.hatchways.io/assessment/students")
      .then((res) => res.json())
      .then((final) => {
        console.log("Fetching Data");
        this.setState({
          students: final.students,
          data: final.students,
        });
        console.log("this.state :>> ", this.state);
      })
      .catch((error) => console.log("Error: ", error));
  }

  updateStudents(event) {
    let result = [];

    console.log("updating Students");
    if (this.state.data) {
      result = this.state.data.filter((student) => {
        return (
          student.firstName.toUpperCase() +
          " " +
          student.lastName.toUpperCase()
        ).includes(event.target.value.toUpperCase());
      });

      console.log("result :>> ", result);
      this.setState({
        students: result,
      });
    }
  }

  updateTags(event) {
    console.log("tagQuery.current.value :>> ", event.target.value);
    this.setState(
      {
        tagFilter: event.target.value,
      },
      () => {
        console.log("Inside Callback");
      }
    );
    console.log("tagFilter", this.state.tagFilter);
  }

  render() {
    return (
      <div className="App">
        <div className="content">
          <input
            type="search"
            className="query"
            placeholder="Search by Name"
            onChange={this.updateStudents}
          />
          <input
            type="search"
            className="query"
            placeholder="Search by Tag"
            onChange={this.updateTags}
          />
          {this.state.students.length ? (
            this.state.students.map((student) => {
              return (
                <div key={student.id}>
                  <Student
                    student={student}
                    tagFilter={this.state.tagFilter}
                  ></Student>
                  {/* Remove last hr using conditional statement */}
                  {student.id !== this.state.students.length && <hr />}
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
}

export default App;
