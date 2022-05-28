// import { SocketContext, socket } from "./context";
import { Box } from "@mui/material";
import { Main } from "./Main";
import "./index.css";

function App() {
  return (
    // <SocketContext.Provider value={socket}>
    <Box
      sx={{
        position: "absolute",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          height: "100%",
        }}
      >
        <Main />
      </Box>
    </Box>
    // </SocketContext.Provider>
  );
}

export default App;
