import React, { useState } from 'react';

export default function App() {
  const [url, setUrl] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    setError('');
  };

  const handleLoadYapp = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a Yapp URL.');
      return;
    }
    if (window.innerWidth <= 600) {
      window.location.href = url.trim();
      return;
    }
    setLoading(true);
    setIframeUrl(url.trim() + '?t=' + Date.now());
  };

  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="title-row">
        <img src="https://i.ibb.co/NdF61ZcW/Yodl-icon-512-x-512-px-180-x-180-px-1.png" alt="Yapp Logo" className="yapp-logo" />
        <h1 className="title">Yapp Tester</h1>
      </div>
      <p className="desc">Test your Yapp before deploying.<br />Enter your Yapp URL below and preview it instantly.</p>
      <form className="input-section" onSubmit={handleLoadYapp} autoComplete="off" style={{flexDirection: 'column', gap: '14px', alignItems: 'stretch'}}>
        <input
          className="url-input"
          type="url"
          placeholder="Enter URL"
          value={url}
          onChange={handleInputChange}
          required
        />
        <button className="load-btn" type="submit">Test Yapp</button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
