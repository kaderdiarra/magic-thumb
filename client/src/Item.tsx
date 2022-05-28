import { Grid } from "@mui/material";
import { MetaData } from "./types";
import { Card } from "./Card";

type Props = {
  /**
   * video video metadata
   */
  item: MetaData;
  /**
   * item position in list
   */
  itemIndex: number;
  /**
   * create reference to item (child) and save it in list container (parent). So parent can manage child using his ref
   */
  elementRef: (element: HTMLDivElement, index: number) => void;
  /**
   * create reference to item (child) and save it in list container (parent). So parent can manage child using his ref
   */
  videoRef: (element: HTMLVideoElement | null, index: number) => void;
  /**
   * scroll to next user view to next card or item
   */
  scrollDown: () => void;
};

export const Item = ({
  item,
  itemIndex,
  elementRef,
  videoRef,
  scrollDown,
}: Props): JSX.Element => {
  return (
    <Grid
      ref={(ref) => elementRef(ref as HTMLDivElement, itemIndex)}
      container
      justifyContent="center"
      sx={{
        height: "100%",
        scrollSnapAlign: "start",
      }}
    >
      <Grid
        item
        sx={(theme) => ({
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          [theme.breakpoints.up(640)]: {
            width: "470px",
          },
          [theme.breakpoints.down(640)]: {
            maxWidth: "468px",
            width: "100%",
          },
        })}
      >
        <Card
          item={item}
          itemIndex={itemIndex}
          videoRef={videoRef}
          scrollDown={scrollDown}
        />
      </Grid>
    </Grid>
  );
};
