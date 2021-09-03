import React, { PureComponent } from "react";

//function to average grades
function avg(grades) {
  let total = 0;
  for (let i = 0; i < grades.length; i++) {
    total += Number(grades[i]);
  }

  return total / grades.length;
}

class Student extends PureComponent {
  constructor(props) {
    super(props);
    this.addTag = this.addTag.bind(this);

    this.state = {
      showGrades: false,
      symbol: "+",
      tags: [],
    };
  }

  //add tag to array
  addTag(event) {
    if (event.keyCode === 13) {
      //console.log("tag.current.value :>> ", tag.current.value);
      this.setState({
        tags: [...this.state.tags, event.target.value],
      });

      event.target.value = "";
      console.log(this.state.tags);
    }
  }

  render() {
    //initialize data
    const imgURL = this.props.student.pic;
    const studentName =
      this.props.student.firstName.toUpperCase() +
      " " +
      this.props.student.lastName.toUpperCase();
    const company = this.props.student.company;
    const email = this.props.student.email;
    const skill = this.props.student.skill;
    const grades = this.props.student.grades;

    //logic for conditionally rendering grades
    const displayGrades = () => {
      if (this.state.symbol === "+") {
        this.setState({
          symbol: "-",
        });
      } else {
        this.setState({
          symbol: "+",
        });
      }

      this.setState({
        showGrades: !this.state.showGrades,
      });
    };

    if (
      this.props.tagFilter === "" ||
      this.state.tags.some((tag) => {
        console.log("checking for tag");
        return tag.includes(this.props.tagFilter);
      })
    ) {
      return (
        <div className="student">
          <img
            src={imgURL}
            alt="student"
            height="50px"
            width="50px"
            className="student-img"
          />
          <div className="column">
            <h1>{studentName}</h1>
            <p>
              Email: {email} <br />
              Company: {company} <br />
              Skill: {skill} <br />
              Average: {avg(this.props.student.grades)}%
            </p>
            {this.state.showGrades && (
              <div className="grades">
                {grades.map((grade, index) => {
                  return (
                    <p>
                      Test {index + 1}: &nbsp;&nbsp;&nbsp;&nbsp; {grade}%
                    </p>
                  );
                })}
              </div>
            )}
            <div className="tag-container">
              {this.state.tags.map((item) => {
                console.log("Adding tags");
                console.log(item);
                return (
                  <div key={item} className="tag">
                    {item}
                  </div>
                );
              })}
            </div>
            <input
              type="text"
              className="tag-input"
              placeholder="Add a tag"
              onKeyDown={this.addTag}
            />
          </div>
          <button className="expand-button" onClick={displayGrades}>
            {this.state.symbol}
          </button>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Student;
