function MovieInfo({ movie }) {
  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="w-60 rounded-md mb-4 shadow-lg"
      />

      <h3 className="text-2xl font-semibold">{movie.title}</h3>

      <p className="mt-2 mb-2 line-clamp-3 text-gray w-100 h-50 font-semibold p-2 rounded-md">
        {movie.overview || "Sem descrição disponível."}
      </p>

      <p className="text-lg mt-2">📅 Ano: {movie.release_date.slice(0, 4)}</p>
      <p className="text-lg">⭐ Nota média: {movie.vote_average.toFixed(1)}</p>
    </>
  );
}

export default MovieInfo;
