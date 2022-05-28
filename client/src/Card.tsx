import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  CardActions,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { red } from "@mui/material/colors";
import { MetaData } from "./types";

export type Props = {
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
  videoRef: (element: HTMLVideoElement | null, index: number) => void;
  /**
   * scroll to next user view to next card or item
   */
  scrollDown: () => void;
};

export const Card = ({
  item,
  itemIndex,
  videoRef,
  scrollDown,
}: Props): JSX.Element => {
  return (
    <MuiCard
      sx={{
        width: "100%",
        margin: "auto",
        height: "auto",
        display: "flex",
        bgcolor: "black",
        flexDirection: "column",
        justifyContent: "center",
        border: "0.5px solid #DBDBDB",
        // "&.MuiCard-root": {
        //   borderColor: "red",
        // },
      }}
    >
      <CardHeader
        sx={{
          height: "auto",
          maxHeight: "3.4rem",
          bgcolor: "white",
          borderBottom: "0.5px solid #DBDBDB",
          "& .MuiCardHeader-action": {
            alignSelf: "center",
          },
        }}
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="post owner profile picture"
            // src={item.owner.profilePicUrl}
            src="https://www.annonces-automobile.com/images/data/actualite/main/111256.jpg"
          />
        }
        title={
          <Typography
            variant="body1"
            fontWeight={600}
            fontSize="0.9rem"
            component="div"
          >
            {item.owner.username}
          </Typography>
        }
        // subheader="January 01 2002"
        action={
          <IconButton aria-label="more information">
            <MoreHorizIcon />
          </IconButton>
        }
      />
      <CardContent
        sx={(theme) => ({
          bgcolor: "transparent",
          padding: 0,
          margin: "auto",
          flexGrow: 1,
          [theme.breakpoints.up(640)]: {
            width: "470px",
          },
          [theme.breakpoints.down(640)]: {
            maxWidth: "300px",
            width: "100%",
          },
        })}
      >
        <video
          ref={(ref) => videoRef(ref, itemIndex)}
          controls
          onEnded={() => scrollDown()}
          style={{
            margin: "auto",
            position: "inherit",
            width: "100%",
            height: "100%",
            maxHeight: "586px",
          }}
        >
          <source src={item.referenceUrl} type={"video/mp4"} />
          Your browser does not support the video tag.
        </video>
      </CardContent>
      <CardActions
        sx={{
          height: "auto",
          maxHeight: "3.2rem",
          borderTop: "0.5px solid #DBDBDB",
          bgcolor: "white",
        }}
      >
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </MuiCard>
  );
};
