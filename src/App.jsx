import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ImageGrid from './components/ImageGrid';
import Lightbox from './components/Lightbox';
import { searchImages } from './api/unsplash';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleSearch = async () => {
    if (!query) return;
    setPage(1);
    const results = await searchImages(query, 1);
    setImages(results);
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    const results = await searchImages(query, nextPage);
    setImages([...images, ...results]);
    setPage(nextPage);
  };

  const selectedImage = images[selectedImageIndex] || null;

  const handleDownload = () => {
    if (selectedImage?.links?.download) {
      window.open(selectedImage.links.download, '_blank');
    }
  };

  return (
    <div className="container">
      <h1>Image Search PRO</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <ImageGrid images={images} onImageClick={setSelectedImageIndex} />
      {images.length > 0 && (
        <div className="load-more">
          <button onClick={loadMore}>Load More</button>
        </div>
      )}
      <Lightbox
        image={selectedImage}
        onClose={() => setSelectedImageIndex(null)}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default App;
