import { Box } from "@mui/material";
import { Main } from "../Main";

type HomeProps = {};

export const HomePage = (props: HomeProps): JSX.Element => {
  return (
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
  );
};
