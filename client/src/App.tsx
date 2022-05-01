import { List } from "./List";
import data from "./data.json";

function App() {
  return (
    <div className="App">
      <div
        style={{
          height: 700,
          marginTop: "2rem",
          backgroundColor: "red",
        }}
      >
        <List data={data} />
      </div>
    </div>
  );
}

export default App;
