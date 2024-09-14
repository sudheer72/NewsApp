import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('light'); // State to manage theme

  const fetchNews = async (searchQuery = 'latest') => {
    try {
      const response = await axios.get('http://localhost:5000/news', {
        params: { query: searchQuery },
      });
      setNews(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(query);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('eye-comfort');
    } else {
      setTheme('light');
    }
  };

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <h1>ACONEWS</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for news"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {/* Theme Toggle Button */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light'
            ? 'Switch to Dark Mode'
            : theme === 'dark'
            ? 'Switch to Eye Comfort'
            : 'Switch to Light Mode'}
        </button>
      </header>

      <div className="news-container">
        {news.map((article, index) => (
          <div key={index} className="news-item">
            <img src={article.image} alt={article.title} />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

