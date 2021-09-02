
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  //hold students
  const [students, setStudents] = useState([])

  //fetch from api on page load
  useEffect(() => {
    fetch("https://api.hatchways.io/assessment/students").then((res) => res.json()).then((final) => setStudents(final));
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
