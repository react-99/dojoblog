import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [isData, setIsData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        // console.log(res);
        if (!res.ok) {
          throw Error("Could not fetch the Data");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setIsData(data);
        setIsPending(false);
        setIsError(null);
      })
      .catch((err) => {
        // console.log(err.message);
        setIsError(err.message);
        setIsPending(false);
      });
  }, [url]);
  return { isData, isPending, isError };
};

export default useFetch;
