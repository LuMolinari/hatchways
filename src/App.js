import React, { PureComponent } from "react";
import Student from "./Student";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.updateStudents = this.updateStudents.bind(this);
    this.updateTags = this.updateTags.bind(this);

    this.state = {
      students: [],
      tagFilter: "",
      nameFilter: "",
    };
  }

  //fetch data from API
  componentDidMount() {
    fetch("https://api.hatchways.io/assessment/students")
      .then((res) => res.json())
      .then((final) => {
        this.setState({
          students: final.students,
          data: final.students,
        });
      })
      .catch((error) => console.log("Error: ", error));
  }

  //filter visible students based on search bar
  updateStudents(event) {
    this.setState({
      nameFilter: event.target.value,
    });
  }

  //update tag being sent to filter students
  updateTags(event) {
    this.setState({
      tagFilter: event.target.value,
    });
  }

  //render main page
  render() {
    return (
      <div className="App">
        <div className="content">
          {/* Input fields for queries */}
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
          {/*check if students array was recieved, then map the array to Student components  */}
          {this.state.students.length ? (
            this.state.students.map((student) => {
              return (
                <Student
                  key={student.id}
                  student={student}
                  tagFilter={this.state.tagFilter}
                  nameFilter={this.state.nameFilter}
                ></Student>
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
