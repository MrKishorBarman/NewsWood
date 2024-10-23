import React, { useState, useEffect, useCallback } from 'react';
import NewsItem from './NewsItem.jsx';
import Spinner from './Spinner.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';

const News = ({ category, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1); 
  const pageSize = 10; 

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NewsWood`;

    const fetchInitialNews = async () => {
      setProgress(10);
      setArticles([]);  
      setPage(1);  
      await loadAllArticles(); 
      setProgress(100);
    };

    
    window.scrollTo(0, 0);

    fetchInitialNews();
  }, [category, setProgress]);

  
  const loadAllArticles = useCallback(async () => {
    try {
      setLoading(true);
      const url = `../JSON/${category}.json`; 
      let data = await fetch(url);

      if (!data.ok) {
        throw new Error(`Error fetching data: ${data.statusText}`);
      }

      let parsedData = await data.json();
      console.log(parsedData); 


      const newArticles = parsedData;
      setAllArticles(newArticles); 
      setTotalResults(newArticles.length); 
      setArticles(newArticles.slice(0, pageSize)); 
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  
  const fetchMoreData = () => {
    const startIndex = page * pageSize;
    const endIndex = (page + 1) * pageSize;

    const newArticles = allArticles.slice(startIndex, endIndex); 

    setArticles((prevArticles) => [...prevArticles, ...newArticles]); 
    setPage(page + 1); 
  };

  return (
    <>
      <h1 className="text-center" style={{ marginTop: '95px', marginBottom: '25px' }}>
        <b>NewsWood - Top {capitalizeFirstLetter(category)} Headlines</b>
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults} 
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((article, index) => (
              <div className="col-md-4" key={`${article.url}-${index}`}>
                <NewsItem
                  title={article.title || ''}
                  description={article.description || ''}
                  imageUrl={article.urlToImage || 'https://elegalmetrology.jharkhand.gov.in/japnet/images/news.jpg'}
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
  category: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
