import logo from "./logo.svg";
import "./App.css";
// import "bootstrap/dist/bootstrap/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./login";
import Dashboard from "./dashboard";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return code ? (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Dashboard code={code}></Dashboard>
      </header>
    </div>
  ) : (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Login />
      </header>
    </div>
  );
}

export default App;
