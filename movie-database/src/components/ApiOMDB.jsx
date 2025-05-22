import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function APIOMDB() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const page = Math.floor(Math.random() * 10) + 1;
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
          params: {
            api_key: API_KEY,
            language: "pt-BR",
            page,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) return <p className="text-white text-center">Carregando...</p>;

  return (
    <div className="bg-neutral-800 min-h-screen p-4 text-white text-center">
      <h1 className="text-5xl font-bold font-[Poppins]">MOVIES DATABASE</h1>
      <h2 className="text-3xl mt-2 mb-10 italic font-bold">Filmes 🎥🎞️</h2>

      <ul className="flex flex-wrap justify-center gap-6">
        {movies.slice(0, 18).map((movie) => (
          <li
            key={movie.id}
            className="w-52 bg-neutral-700 p-3 rounded-lg shadow-lg hover:scale-105 transition shadow-black"
          >
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
              <p className=" mt-1 text-1xl">
                Ano: {movie.release_date?.slice(0, 4)}📅
              </p>
              <p className="text-1-xl">
                Avaliação: {movie.vote_average?.toFixed(1)}⭐
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default APIOMDB;
