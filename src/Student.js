//function to average grades
function avg(grades) {
    let total = 0;
    for (let i = 0; i < grades.length; i++){
        total += Number(grades[i]);
    }

    return total / grades.length;
}

const Student = (student) => {
    //initialize data
    const imgURL = student.student.pic;
    const studentName =
        student.student.firstName.toUpperCase() + " " + student.student.lastName.toUpperCase();
    const company = student.student.company;
    const email = student.student.email
    const skill = student.student.skill

    //display student data
    return (
      <div className="student">
        <img src={imgURL} alt="student image" height="50px" width="50px" className="student-img" />
        <div className="column">
          <h1>{studentName}</h1>
          <p>
            Email: {email} <br />
            Company: {company} <br />
            Skill: {skill} <br />
            Average: {avg(student.student.grades)}%
          </p>
            </div>
            
      </div>
    );
}
 
export default Student;