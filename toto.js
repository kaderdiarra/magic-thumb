/* App.js

import "./styles.css";
import Item from "./Item";
import { useRef, useState } from "react";

const Data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function App() {
  const listRef = useRef(null);
  const itemRefs = useRef([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    if (currentIndex + 1 < Data.length) {
      const nextItemIndex = currentIndex + 1;
      const nextItem = itemRefs.current[nextItemIndex];
      const offsetHeight = nextItem.offsetHeight;
      const scrollTop = nextItemIndex * offsetHeight;
      const nextItemChild = nextItem.children[1];

      console.log("🚀 video ref:", nextItemChild);
      console.log("🚀 INDEX:", nextItemIndex);
      listRef.current.scrollTop = scrollTop;
      setTimeout(() => {
        nextItemChild.play();
      }, 1000);

      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="App">
      <button onClick={handleScroll}>scroll</button>
      <div style={{ height: 700, marginTop: "2rem", backgroundColor: "red" }}>
        <div
          id="list-container"
          ref={listRef}
          style={{
            height: "600px",
            backgroundColor: "green",
            overflow: "auto",
            scrollBehavior: "smooth",
            scrollSnapType: "y mandatory",
            WebkitOverflowScrolling: "touch"
          }}
        >
          {Data.map((item, index) => (
            <Item
              elementRef={(element) => {
                itemRefs.current[index] = element;
              }}
              key={index}
              id={`item-${index}`}
              text={`Item ${index} 🚀`}
              handleScroll={handleScroll}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


*/

/* Item.js

const Item = ({ text, handleScroll, elementRef }) => {
  const handleVideoEnd = () => {
    console.log("🚀 VIDEO ENDED");
    handleScroll();
  };

  return (
    <div
      ref={elementRef}
      style={{
        backgroundColor: "orange",
        // margin: "3rem 5rem",
        height: 600,
        borderTopColor: "black",
        borderTopWidth: 2,
        borderTopStyle: "solid",
        scrollSnapAlign: "start",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <h2>{text}</h2>
      <video width="60%" height="60%" controls onEnded={handleVideoEnd}>
        <source
          src="https://cdn.videvo.net/videvo_files/video/free/2012-10/large_watermarked/Race%20Cars%20on%20Grid-Stock%20Video_preview.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Item;


*/
