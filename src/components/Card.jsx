import React from "react";

const Card = ({ movie, onClick }) => {
  const { title, vote_average, poster_path, release_date, original_language } =
    movie;
    if (!movie) return null; 

  return (
    <>
      <div className="movie-card" onClick={() => onClick(movie.id)}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "./No-movie.png"
          }
          alt="{title}"
        />
        <div className="mt-4">
          <h3>{title}</h3>
        </div>
        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="star icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            <span>•</span>
            <p className="lang">
              {original_language ? original_language : "N/A"}
            </p>
            <span>•</span>
            <p className="year">
              {release_date ? release_date.split("-")[0] : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
