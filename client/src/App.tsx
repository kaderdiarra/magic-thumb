// import { SocketContext, socket } from "./context";
import { Main } from "./Main";

function App() {
  return (
    // <SocketContext.Provider value={socket}>
    <div className="App">
      <div
        style={{
          height: 700,
          marginTop: "2rem",
          backgroundColor: "red",
        }}
      >
        <Main />
      </div>
    </div>
    // </SocketContext.Provider>
  );
}

export default App;
