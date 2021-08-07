import "./App.css";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <h1>Only the strong survive</h1>
      <GameBoard />
    </div>
  );
}

export default App;
