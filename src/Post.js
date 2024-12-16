// how posts are displayed

import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import "./posts.css";

export default function Post({ _id, title, summary, cover, content, createdAt, author }) {
  const coverImageUrl = cover ? 'https://mentormatch-backend-hhausvlg9-diyas-projects-723f1dff.vercel.app/' + cover : 'default-image.jpg'; 

  console.log(author);
  const authorName = author && author.username ? author.username : 'Anonymous';

  const handleLinkClick = (e) => {
    if (!author) {
      e.preventDefault();
      alert('Deleted Post'); 
    }
  };

  return (
    <div className="post-container">
      <div className="post-image">
        <Link to={`/post/${_id}`} onClick={handleLinkClick}>
          <img src={coverImageUrl} alt={title} />
        </Link>
      </div>
      <div className="post-details">
        <Link to={`/post/${_id}`} onClick={handleLinkClick}>
          <h2 className="post-title">{title}</h2>
        </Link>
        <p className="post-info">
          <a className="post-author">{authorName}</a>
          <time className="post-date">{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="post-summary">{summary}</p>
      </div>
    </div>
  );
}
