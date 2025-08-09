import React from 'react';

const ImageGrid = ({ images, onImageClick }) => {
  return (
    <div className="grid">
      {images.map((img, i) => (
        <div key={img.id} className="card" onClick={() => onImageClick(i)}>
          <img src={img.urls.small} alt={img.alt_description} loading="lazy" />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
