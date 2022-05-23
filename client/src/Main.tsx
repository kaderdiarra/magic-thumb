import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
// import { SocketContext } from "./context";
import { Container } from "./Container";
import { MetaData } from "./types";

export type Props = {};

type Data = {
  items: MetaData[];
  nbrOfPage: number;
  nbrOfItem: number;
};

export const Main = (props: Props): JSX.Element => {
  const [data, setData] = useState<Data>({
    items: [],
    nbrOfItem: 0,
    nbrOfPage: 0,
  });

  const [page, setPage] = useState(1);
  // const [joined, setJoined] = useState(false);

  // const socket = useContext(SocketContext);

  // const handleTestSocket = useCallback(() => {
  //   setJoined(true);
  // }, []);

  // useEffect(() => {
  //   socket.emit("CONNECTION");
  //   console.log("🚀 ~ file: Main.tsx ~ line 33 ~ useEffect ~ CONNECTION");

  //   socket.on("TEST_SOCKET", handleTestSocket);
  //   return () => {
  //     // socket.off("TEST_SOCKET", handleTestSocket);
  //     socket.disconnect(true);
  //   };
  // }, [socket, handleTestSocket]);

  useEffect(() => {
    loadData(1);
  }, []);

  const loadData = async (page: number) => {
    try {
      const response = await axios.get(
        `http://localhost:3333/metadata/pagination?page=${page}`
      );
      if (!response.data) throw new Error("Empty data");

      setData((prev) => {
        return {
          nbrOfPage: response.data?.pagination?.nbrOfPage,
          nbrOfItem: response.data?.pagination?.nbrOfItem,
          items: [...prev.items, ...response.data.items],
        };
      });
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error); // TODO: replace by snackbar
    }
  };

  return (
    <Container
      data={data.items}
      page={page}
      nbrOfPage={data.nbrOfPage}
      loadPage={loadData}
    />
  );
};
