import { useRef, useState, useEffect } from "react";
import { ListItem } from "./ListItem";
import { MetaData } from "./types";

type Props = {
  data: MetaData[];
};

type Video = HTMLVideoElement | null;

export const List = ({ data }: Props): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const item = itemRefs.current[0];
    const itemVideo = item.children[1] as Video;
    itemVideo?.play();
  }, []);

  const playVideo = (video: Video, delay = 1000) => {
    if (!delay) {
      video?.play();
      return;
    }

    setTimeout(() => {
      video?.play();
    }, delay);
  };

  const handleScrollingDown = () => {
    if (!listRef.current) throw Error("listRef is not assigned");
    if (currentIndex + 1 < data.length) {
      const nextItemIndex = currentIndex + 1;
      const nextItem = itemRefs.current[nextItemIndex];
      const offsetHeight = nextItem.offsetHeight;
      const scrollTop = nextItemIndex * offsetHeight;
      const nextItemVideo = nextItem.children[1] as Video;

      console.log("🚀 video ref:", nextItemVideo);
      console.log("🚀 INDEX:", nextItemIndex);
      listRef.current.scrollTop = scrollTop;

      playVideo(nextItemVideo);
      setCurrentIndex((prev) => prev + 1);
      console.log("GET VIDEO 🚀");
    }
  };

  const createListItemRef = (element: HTMLDivElement, index: number) => {
    itemRefs.current[index] = element;
  };

  const generateListItem = () => {
    const items = data.map((item, index) => {
      return (
        <ListItem
          key={`item-key-${item.id}`}
          // id={`item-id-${item.id}`}
          elementRef={createListItemRef}
          item={item}
          itemIndex={index}
          scrollDown={handleScrollingDown}
        />
      );
    });
    return items;
  };

  return (
    <div
      ref={listRef}
      style={{
        height: "600px",
        backgroundColor: "green",
        overflow: "auto",
        scrollBehavior: "smooth",
        scrollSnapType: "y mandatory",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {generateListItem()}
    </div>
  );
};
