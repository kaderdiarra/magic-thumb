import { useRef, useState, useEffect, useCallback } from "react";
import {
  DELAY_BEFORE_PLAY,
  LIMIT_TO_LOAD_PAGE,
  STOP_SCROLL_DELAY,
} from "./constants";
import { ListItem } from "./ListItem";
import { MetaData } from "./types";

type Props = {
  data: MetaData[];
  page: number;
  nbrOfPage: number;
  loadPage: (page: number) => void;
};

type Video = HTMLVideoElement | null;

export const List = ({
  data,
  page,
  nbrOfPage,
  loadPage,
}: Props): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const prevClosestItemIndex = useRef<number>(0);

  const updateDisplayedItem = useCallback(
    (currentDisplayedItemIndex: number) => {
      if (prevClosestItemIndex.current !== currentDisplayedItemIndex) {
        prevClosestItemIndex.current = currentDisplayedItemIndex;
        // check if nbr item === limit => load new page
        const listLength = itemRefs.current.length;
        if (
          listLength - (currentDisplayedItemIndex + 1) <=
          LIMIT_TO_LOAD_PAGE
        ) {
          if (page <= nbrOfPage) loadPage(page);
        }
        setCurrentIndex(() => {
          const video = itemRefs.current[currentIndex].children[1] as Video;
          stopVideo(video);
          const nextVideo = itemRefs.current[currentDisplayedItemIndex]
            .children[1] as Video;
          playVideo(nextVideo, DELAY_BEFORE_PLAY);
          return currentDisplayedItemIndex;
        });
      }
    },
    [currentIndex, loadPage, nbrOfPage, page]
  );

  useEffect(() => {
    const destroyListener = createScrollStopListener(
      listRef.current,
      () => {
        const currentDisplayedItemIndex = getCurrentDisplayedItemIndex();
        updateDisplayedItem(currentDisplayedItemIndex);
      },
      STOP_SCROLL_DELAY
    );

    return () => destroyListener();
  }, [updateDisplayedItem]);

  const getCurrentDisplayedItemIndex = (): number => {
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
    return closestItemIndex;
  };

  const stopVideo = (video: Video) => {
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

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
      listRef.current.scrollTop = scrollTop;

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
          key={`item-key-${item._id}`}
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
