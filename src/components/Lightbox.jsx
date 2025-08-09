import React from 'react';

const Lightbox = ({ image, onClose, onDownload }) => {
  if (!image) return null;

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={image.urls.full} alt={image.alt_description} />
        <div className="lightbox-footer">
          <button onClick={onDownload}>Download</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
