import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Pictures from "../components/Pictures";

function Homepage() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");

  const auth = "563492ad6f91700001000001b619652206dd49ff97efcf67d74fdd0e";
  const initialUrl = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchUrl = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`;

  //fetch data
  const search = async (url) => {
    setPage(2);
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseData = await dataFetch.json();
    setData(parseData.photos);
  };

  const morePicture = async () => {
    let newUrl;
    if (currentSearch === "") {
      newUrl = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    } else {
      newUrl = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    }
    setPage(page + 1);
    const dataFetch = await fetch(newUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseData = await dataFetch.json();
    setData(data.concat(parseData.photos));
  };

  useEffect(() => {
    search(initialUrl);
  }, []);

  useEffect(() => {
    if (currentSearch === "") {
      search(initialUrl);
    } else {
      search(searchUrl);
    }
  }, [currentSearch]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          // JS Closure
          setCurrentSearch(input);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Pictures data={d} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>Load More</button>
      </div>
    </div>
  );
}

export default Homepage;
