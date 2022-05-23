import React from "react";
import { Card } from "./Card";
import { MetaData } from "./types";

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
    <div
      ref={(ref) => elementRef(ref as HTMLDivElement, itemIndex)}
      style={{
        backgroundColor: "orange",
        height: 600,
        borderTopColor: "black",
        borderTopWidth: 2,
        borderTopStyle: "solid",
        scrollSnapAlign: "start",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>good video</h2>
      <video
        ref={(ref) => videoRef(ref, itemIndex)}
        width="60%"
        height="60%"
        controls
        onEnded={() => scrollDown()}
      >
        <source src={item.referenceUrl} type={"video/mp4"} />
        Your browser does not support the video tag.
      </video>
      <Card />
    </div>
  );
};
