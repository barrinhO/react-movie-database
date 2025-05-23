import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <li className="w-52 bg-neutral-700 p-3 rounded-lg shadow-lg hover:scale-105 transition shadow-black">
      <Link
        to={`/detalhes?id=${movie.id}`}
        className="flex flex-col items-center"
      >
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className="w-48 h-72 object-cover rounded-md"
        />
        <strong className="mt-2 font-semibold line-clamp-2 text-1xl">
          {movie.title}
        </strong>
        <p className="mt-1 text-1xl">
          Ano: {movie.release_date?.slice(0, 4)}📅
        </p>
        <p className="text-1-xl">
          Avaliação: {movie.vote_average?.toFixed(1)}⭐
        </p>
      </Link>
    </li>
  );
}

export default MovieCard;
