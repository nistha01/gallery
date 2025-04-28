import React, { useState } from "react";
import "./AddVideo.css"; // make sure you have the css

const AddVideo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setError("");
    setSuccess("");
  };

  const closeModal = () => {
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setError("");
    setSuccess("");
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title || !description) {
      setError("Please fill all fields and select a video.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      

      console.log(response.status);
            if (!response.status==200) {
                throw new Error("Failed to upload video.");
            }

      setSuccess("Video uploaded successfully!");
      setTimeout(() => {
        closeModal();
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Error uploading video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="add-video-btn" onClick={openModal}>
        + Add Video
      </button>

      {isOpen && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Upload Video</h2>
            <form className="add-video-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <input
                type="file"
                accept="video/mp4"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />

              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}

              <div className="form-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? "Uploading..." : "Upload"}
                </button>
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddVideo;
