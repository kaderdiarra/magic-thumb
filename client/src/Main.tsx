import axios from "axios";
import { useEffect, useState } from "react";
import { List } from "./List";
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
  useEffect(() => {
    loadData(1);
  }, []);

  const loadData = async (page: number) => {
    console.log("SEND REQUEST 🔥");
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
      console.log("🚀", error); // TODO: replace by snackbar
    }
  };

  return (
    <>
      <List
        data={data.items}
        page={page}
        nbrOfPage={data.nbrOfPage}
        loadPage={loadData}
      />
    </>
  );
};
