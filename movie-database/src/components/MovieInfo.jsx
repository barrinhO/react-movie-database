// Componente para exibir informações de um filme

function MovieInfo({ movie }) {
  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="w-60 rounded-md mb-4 shadow-lg"
      />

      <h3 className="text-2xl font-semibold">{movie.title}</h3>

      <p className="mt-2 mb-4 max-w-xl text-gray-200 font-medium text-justify p-4 rounded-md bg-neutral-700">
        {movie.overview || "Sem descrição disponível."}
      </p>

      <p className="text-lg mt-2">📅 Ano: {movie.release_date.slice(0, 4)}</p>
      <p className="text-lg">⭐ Nota média: {movie.vote_average.toFixed(1)}</p>
    </>
  );
}

export default MovieInfo;
