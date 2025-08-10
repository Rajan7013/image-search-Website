import React, { useState, useEffect } from 'react';
import { searchPhotos } from '../api/search';
import { getRandomPhoto } from '../api/random';

export default function Search() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load random photo on mount
  useEffect(() => {
    async function loadRandom() {
      setLoading(true);
      try {
        const randomData = await getRandomPhoto();
        if (randomData) {
          setPhotos([randomData]);
        }
      } catch (err) {
        setError('Failed to load random photo.');
      } finally {
        setLoading(false);
      }
    }
    loadRandom();
  }, []);

  // Search function
  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await searchPhotos(query, 1, 12);
      setPhotos(data.results || []);
    } catch (err) {
      setError('Failed to search photos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        padding: '30px'
      }}
    >
      <form
        onSubmit={handleSearch}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px'
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search high-quality images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: '12px 18px',
            borderRadius: '25px',
            border: 'none',
            outline: 'none',
            width: '280px',
            fontSize: '16px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transition: '0.3s',
            marginRight: '10px'
          }}
          onFocus={(e) => (e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)')}
          onBlur={(e) => (e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)')}
        />
        <button
          type="submit"
          style={{
            padding: '12px 20px',
            borderRadius: '25px',
            background: '#ff6a88',
            backgroundImage: 'linear-gradient(315deg, #ff6a88 0%, #ff99ac 74%)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: '0.3s'
          }}
          onMouseOver={(e) => (e.target.style.opacity = '0.8')}
          onMouseOut={(e) => (e.target.style.opacity = '1')}
        >
          Search
        </button>
      </form>

      {loading && <p style={{ textAlign: 'center', color: '#fff' }}>Loading...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '20px'
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            style={{
              background: '#fff',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img
              src={photo.urls.small}
              alt={photo.alt_description}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover'
              }}
            />
            <p
              style={{
                padding: '10px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                margin: 0
              }}
            >
              {photo.user.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
