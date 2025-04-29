import React, { useState } from 'react';

function normalizeUrl(input) {
  // Add https:// if missing and not a localhost/dev URL
  if (/^(https?:)?\/\//i.test(input)) return input;
  if (/^localhost[:\/]|^127\./.test(input)) return 'http://' + input;
  return 'https://' + input;
}

export default function App() {
  const [url, setUrl] = useState('');
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
    const normalized = normalizeUrl(url.trim());
    try {
      new URL(normalized);
    } catch {
      setError('Please enter a valid URL.');
      return;
    }
    window.location.href = normalized;
  };

  return (
    <div className="container">
      <div className="purple-blur blur-left" />
      <div className="purple-blur blur-right" />
      <img src="https://i.ibb.co/6ctCThjx/Yodl-icon-512-x-512-px-180-x-180-px-2.png" alt="Yapp Logo" className="yapp-logo no-bg" />
      <div className="title-row">
        <h1 className="title">Yapp Tester</h1>
      </div>
      <p className="desc">Test your Yapp before deploying.<br />Enter your Yapp URL below and preview it instantly.</p>
      <form className="input-section" onSubmit={handleLoadYapp} autoComplete="off">
        <input
          className="url-input"
          type="text"
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
