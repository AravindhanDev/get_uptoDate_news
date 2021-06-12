import React, { useEffect, useState } from "react";

const App = () => {
  const [newsType, setNewsType] = useState();
  const [news, setNews] = useState([]);
  const [url, setURL] = useState(
    "https://hn.algolia.com/api/v1/search?query=react"
  );
  const [loading, setLoading] = useState(false);

  const fetchNews = () => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((json) => (setNews(json.hits), setLoading(false)))
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    setNewsType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setURL(`https://hn.algolia.com/api/v1/search?query=${newsType}`);
    setNewsType("");
  };


  const searchNews = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          value={newsType}
          placeholder="Need More News..."
        />
        <button><i class="fa fa-search"></i></button>
      </form>
    );
  };

  const showNews = () => news.map((n, i) => <p key={i}>{n.title}</p>);

  useEffect(() => {
    fetchNews();
  }, [url]);

  return (
    <div>
      <h2>News</h2>
      {loading && <h4>Loading...</h4>}
      {searchNews()}
      {showNews()}
    </div>
  );
};

export default App;
