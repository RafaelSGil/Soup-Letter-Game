import "./assets/styles/App.css";
import ControlPanel from "./components/control-panel/control-panel";

function App() {
  return (
    <div id="container">
      <h2>WORD GAME</h2>
      <h3>Find all the words and win money!</h3>
      <ControlPanel />
    </div>
  );
}

export default App;
