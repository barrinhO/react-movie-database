import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function APIOMDB() {
  const [movies, setMovies] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarFilmes = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/movie/popular`, {
          params: {
            api_key: API_KEY,
            language: "pt-BR",
            page: 1,
          },
        });
        setMovies(res.data.results);
      } catch (err) {
        console.error("Erro ao buscar filmes:", err);
      } finally {
        setCarregando(false);
      }
    };

    buscarFilmes();
  }, []);

  if (carregando) return <p>Carregando...</p>;

  return (
    <div className="flex flex-col items-center bg-neutral-700 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-white font-[Poppins]">
        MOVIES DATABASE
      </h1>
      <h2 className="text-xl text-white mb-6">Filmes 🎥🎞️</h2>

      <ul className="flex flex-wrap justify-center gap-6 transition-all duration-0.3 ease-in-out">
        {movies.slice(0, 18).map((filme) => (
          <li
            key={filme.id}
            className="p-3 rounded-lg flex flex-col items-center w-52 shadow-emerald-500 shadow-lg bg-neutral-600 transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer hover:shadow-lg hover:shadow-emerald-300"
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`}
              alt={filme.title}
              className="w-48 h-72 object-cover rounded-md"
            />
            <strong className="mt-2 text-center text-white font-semibold text-base line-clamp-2">
              {filme.title}
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default APIOMDB;
