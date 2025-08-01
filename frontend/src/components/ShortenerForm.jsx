import { useState } from 'react';
import axios from 'axios';
import './ShortenerForm.css';

const API = 'http://localhost:5000';

function ShortenerForm() {
  const [url, setUrl] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [result, setResult] = useState(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    setResult(null);

    try {
      const res = await axios.post(`${API}/shorturls`, { url, shortcode });
      setResult(res.data.shortLink);
    } catch (error) {
      setErr(error.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="terminal">
      <h1>URL SHORTENER</h1>
      <form onSubmit={handleSubmit}>
        <label>URL:</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
        />
        <label>Shortcode (optional):</label>
        <input
          type="text"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          placeholder="e.g. abc123"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Generate'}
        </button>
      </form>

      {result && (
        <div className="output">
          Shortened: <a href={result}>{result}</a>
        </div>
      )}

      {err && <div className="error">ERROR: {err}</div>}
    </div>
  );
}

export default ShortenerForm;
