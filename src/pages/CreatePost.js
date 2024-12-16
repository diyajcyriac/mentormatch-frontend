import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../Editor";
import "./EditProfile.css";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const targetNode = document.getElementById('root'); // Replace with a specific target node if needed
    if (!targetNode) return;

    const config = { childList: true, subtree: true };

    const callback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          console.log('DOM changed: Child nodes added or removed.');
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
    return () => {
      observer.disconnect();
    };
  }, []);

  async function createNewPost(ev) {
    ev.preventDefault();

    // Validation logic
    if (!title || !summary || !content || !files) {
      setError("All fields are required. Please fill out the form completely.");
      return;
    }

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    try {
      const response = await fetch('https://mentormatch-backend-y3wu.onrender.com/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });
      if (response.ok) {
        setRedirect(true);
      } else {
        setError("Failed to create post. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while creating the post.");
    }
  }

  if (redirect) {
    navigate('/');
  }

  const cancel = () => {
    navigate('/'); 
  };

  return (
    <div className="edit-profile">
      <h1>Create Post</h1>
      {error && <p className="display-error">{error}</p>} 
      <form onSubmit={createNewPost} className="form-container">
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter post title"
            value={title}
            onChange={ev => setTitle(ev.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="summary">Summary</label>
          <input
            type="text"
            id="summary"
            placeholder="Enter post summary"
            value={summary}
            onChange={ev => setSummary(ev.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="file">Upload File</label>
          <input
            type="file"
            id="file"
            onChange={ev => setFiles(ev.target.files)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="content">Content</label>
          <Editor value={content} onChange={setContent} />
        </div>
        <div className="button-group">
          <button type="submit" className="btn-update">Create Post</button>
          <button type="button" className="btn-cancel" onClick={cancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
