import React, { useState } from "react";
import { searchPhotos } from "../api/search";

const buttonStyles = {
  padding: "8px 16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  background: "#ff6a88",
  color: "#fff",
  transition: "opacity 0.3s",
  margin: "0 5px",
};

function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#333",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "25px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        zIndex: 2000,
      }}
    >
      {message}
    </div>
  );
}

function Lightbox({ image, onClose, onDownload }) {
  if (!image) return null;

  return (
    <div
      className="lightbox"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="lightbox-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            fontSize: "24px",
            background: "transparent",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
          aria-label="Close"
          title="Close"
        >
          ✖
        </button>
        <img
          src={image.urls.full}
          alt={image.alt_description || "Image"}
          style={{
            maxWidth: "100%",
            maxHeight: "80vh",
            borderRadius: "10px",
            display: "block",
          }}
        />
        <div
          className="lightbox-footer"
          style={{ marginTop: 12, textAlign: "center" }}
        >
          <button
            onClick={onDownload}
            style={{
              ...buttonStyles,
              padding: "10px 20px",
              fontSize: "16px",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.8")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [lightboxImage, setLightboxImage] = useState(null);

  const showToast = (msg, duration = 2000) => {
    setToast(msg);
    setTimeout(() => setToast(""), duration);
  };

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a valid search term.");
      setPhotos([]);
      return;
    }
    setLoading(true);
    setError("");
    setPhotos([]);
    setPage(1);

    try {
      const data = await searchPhotos(query, 1, 15);
      if (data.results.length === 0) {
        setError("No images found. Please check spelling or try another keyword.");
      }
      setPhotos(data.results);
    } catch {
      setError("Failed to search photos.");
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    setLoading(true);
    setError("");
    try {
      const nextPage = page + 1;
      const data = await searchPhotos(query, nextPage, 15);
      if (data.results.length === 0) {
        setError("No more images found.");
      } else {
        setPhotos((prev) => [...prev, ...data.results]);
        setPage(nextPage);
      }
    } catch {
      setError("Failed to load more photos.");
    } finally {
      setLoading(false);
    }
  }

  function downloadPhoto(photo) {
    if (!photo || !photo.urls || !photo.urls.full) return;

    showToast("Downloading...");

    const link = document.createElement("a");
    link.href = photo.urls.full;
    link.download = `${photo.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function openLightbox(photo) {
    setLightboxImage(photo);
  }

  function closeLightbox() {
    setLightboxImage(null);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        padding: "30px",
      }}
    >
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search high-quality images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "12px 18px",
            borderRadius: "25px",
            border: "none",
            outline: "none",
            width: "280px",
            fontSize: "16px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            transition: "0.3s",
            marginRight: "10px",
          }}
          onFocus={(e) => (e.target.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)")}
          onBlur={(e) => (e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)")}
        />
        <button
          type="submit"
          style={{
            padding: "12px 20px",
            borderRadius: "25px",
            background: "#ff6a88",
            backgroundImage: "linear-gradient(315deg, #ff6a88 0%, #ff99ac 74%)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.opacity = "0.8")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          Search
        </button>
      </form>

      {loading && <p style={{ textAlign: "center", color: "#fff" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "yellow" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {photos.map((photo) =>
          photo && photo.urls && photo.urls.small ? (
            <div
              key={photo.id}
              style={{
                background: "#fff",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={photo.urls.small}
                alt={photo.alt_description || "Image"}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => openLightbox(photo)}
              />
              <p
                style={{
                  padding: "10px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#333",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                {photo.user?.name || "Unknown"}
              </p>
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <button
                  style={buttonStyles}
                  onClick={() => openLightbox(photo)}
                  title="View Full Image"
                >
                  View
                </button>
                <button
                  style={buttonStyles}
                  onClick={() => downloadPhoto(photo)}
                  title="Download Image"
                >
                  Download
                </button>
              </div>
            </div>
          ) : null
        )}
      </div>

      {photos.length > 0 && !loading && !error && (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            style={{
              ...buttonStyles,
              padding: "12px 30px",
              fontSize: "16px",
            }}
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      )}

      <Lightbox
        image={lightboxImage}
        onClose={closeLightbox}
        onDownload={() => downloadPhoto(lightboxImage)}
      />
      <Toast message={toast} />
    </div>
  );
}
