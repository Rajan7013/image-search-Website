import React from "react";

const buttonStyles = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  background: "#ff6a88",
  color: "#fff",
  transition: "opacity 0.3s",
  margin: "10px",
};

const Lightbox = ({ image, onClose, onDownload }) => {
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
            style={buttonStyles}
            onMouseOver={(e) => (e.target.style.opacity = "0.8")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
