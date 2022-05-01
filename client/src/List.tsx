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
  const prevClosestItemIndex = useRef<number>(0);

  useEffect(() => {
    const destroyListener = createScrollStopListener(
      listRef.current,
      () => {
        let closestItemIndex = 0;
        let previousDistance = 0;
        const scrollTop = listRef.current?.scrollTop ?? 0;
        // find position of item where scroll bar is
        itemRefs.current.forEach((item, index) => {
          const distance = Math.abs(item.offsetTop - scrollTop);
          if (index === 0) previousDistance = distance;
          if (distance < previousDistance) {
            previousDistance = distance;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            closestItemIndex = index;
          }
        });

        // stop previous video playing and start next one
        if (prevClosestItemIndex.current !== closestItemIndex) {
          prevClosestItemIndex.current = closestItemIndex;
          setCurrentIndex((prev) => {
            const video = itemRefs.current[currentIndex].children[1] as Video;
            video?.pause();
            const nextVideo = itemRefs.current[closestItemIndex]
              .children[1] as Video;
            playVideo(nextVideo);
            return closestItemIndex;
          });
        }
      },
      500
    );

    return () => destroyListener();
  }, [currentIndex]);

  // const startPlayingVideo = async () => {
  //   const item = itemRefs.current[0];
  //   const itemVideo = item.children[1] as Video;
  //   await itemVideo?.play();
  // };

  const playVideo = async (video: Video, delay = 1000) => {
    if (!delay) {
      await video?.play();
      return;
    }

    setTimeout(async () => {
      await video?.play();
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

      listRef.current.scrollTop = scrollTop;

      playVideo(nextItemVideo);
      console.log("UPDATE CURRENT INDEX 🚀");
      setCurrentIndex((prev) => prev + 1);
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

  const createScrollStopListener = (
    element: HTMLElement | null,
    callback: () => void,
    timeout: number = 200
  ) => {
    let removed = false;
    let handle: NodeJS.Timeout | null = null;
    const onScroll = () => {
      if (handle) {
        clearTimeout(handle);
      }
      handle = setTimeout(callback, timeout); // default 200 ms
    };
    element?.addEventListener("scroll", onScroll);
    return () => {
      if (removed) {
        return;
      }
      removed = true;
      if (handle) {
        clearTimeout(handle);
      }
      element?.removeEventListener("scroll", onScroll);
    };
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
