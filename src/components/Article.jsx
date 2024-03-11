import React from "react";

const Article = ({ title, description, page }) => {
  return (
    <div className="article-box">
      <a href={page} target="_blank" className="article" rel="noreferrer">
        <h2 className="title-article">{title}</h2>
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </a>
    </div>
  );
};

export default Article;
