import React, { useState } from "react";
import Article from "./components/Article";

function WikiViewer() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [inputInfo, setInputInfo] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();

    if (input === "") return;

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=9&srsearch=${input}`;

    const res = await fetch(endpoint);

    if (!res.ok) {
      throw Error(res.statusText);
    }

    const json = await res.json();

    setData(json.query.search);
    setInputInfo(json.query.searchinfo);
  };

  const handleRandomArticle = () => {
    const randomNum = Math.floor(Math.random() * 9000);
    const url = `https://en.wikipedia.org/?curid=${randomNum}`;

    window.open(url, "_blank");
  };

  return (
    <>
      <header className="header">
        <h1>Wikipedia Viewer</h1>
      </header>
      <main>
        <button className="random-article" onClick={handleRandomArticle}>
          Click here for a random article
        </button>
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="search"
            id="search-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="search-input"
            placeholder="Search"
          />
        </form>
        <div className="results">
          {data.map((item, i) => {
            const url = `https://en.wikipedia.org/?curid=${item.pageid}`;
            return (
              <Article
                key={i}
                title={item.title}
                description={item.snippet}
                page={url}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}

export default WikiViewer;
