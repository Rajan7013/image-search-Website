import React from "react";

const ImageGrid = ({ images, onView, onDownload }) => {
  return (
    <div
      className="grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px",
      }}
    >
      {images.map((img) =>
        img && img.urls && img.urls.small ? (
          <div
            key={img.id}
            className="card"
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
              src={img.urls.small}
              alt={img.alt_description || "Image"}
              loading="lazy"
              style={{ width: "100%", height: "200px", objectFit: "cover", cursor: "pointer" }}
              onClick={() => onView(img)}
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
              {img.user?.name || "Unknown"}
            </p>
            <div
              style={{
                padding: "10px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  background: "#ff6a88",
                  color: "#fff",
                  transition: "opacity 0.3s",
                  margin: "0 5px",
                }}
                onClick={() => onView(img)}
                title="View Full Image"
              >
                View
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  background: "#ff6a88",
                  color: "#fff",
                  transition: "opacity 0.3s",
                  margin: "0 5px",
                }}
                onClick={() => onDownload(img)}
                title="Download Image"
              >
                Download
              </button>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default ImageGrid;
