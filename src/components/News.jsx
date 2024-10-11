import React, { useState, useEffect, useCallback } from 'react';
import NewsItem from './NewsItem.jsx';
import Spinner from './Spinner.jsx';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({country, pageSize, category, apiKey, setProgress}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NewsWood`;
    
    const fetchInitialNews = async () => {
      setProgress(10);
      await updateNews();
      setProgress(100);
    };
    fetchInitialNews();
  }, []);

  const updateNews = useCallback(async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();

    const newArticles = parsedData.articles ? parsedData.articles : [];
    const uniqueNewArticles = newArticles.filter(
      article => !articles.some(existingArticle => existingArticle.url === article.url)
    );

    setArticles(prevArticles => [...prevArticles, ...uniqueNewArticles]);
    setTotalResults(parsedData.totalResults || 0);
    setLoading(false);
  }, [page, country, category, pageSize, apiKey, articles]);

  const fetchMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      updateNews();
    }
  }, [page, updateNews]);

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "95px", marginBottom: "25px" }}>
        <b>NewsWood - Top {capitalizeFirstLetter(category)} Headlines</b>
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<h4><Spinner /></h4>}
      >
        <div className="container">
          <div className="row">
            {articles.map((article) => (
              <div className="col-md-4" key={article.url}>
                <NewsItem
                  title={article.title || ""}
                  description={article.description || ""}
                  imageUrl={article.urlToImage || "https://elegalmetrology.jharkhand.gov.in/japnet/images/news.jpg"}
                  newsUrl={article.url}
                  author={article.author}
                  date={article.publishedAt}
                  source={article.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired
};

export default News;
