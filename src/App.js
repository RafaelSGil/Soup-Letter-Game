import "./assets/styles/App.css";
import GamePanel from "./components/game-panel/game-panel";
import StartGameModal from "./components/game-start-modal/game-start-modal.component";

function App() {
  return (
    <>
    <div>
      <GamePanel />
      <div>
        <button>show</button>
        <StartGameModal/>
      </div>
    </div>
    </>
  );
}

export default App;
