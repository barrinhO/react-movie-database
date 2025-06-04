// Componente principal que busca filmes da API do TMDB

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "./Button";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function APITMDB() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Função que busca os filmes populares da API do TMDB

  const fetchMovies = async () => {
    setLoading(true);
    try {
      // Remover filmes antigos salvos para forçar novo carregamento
      sessionStorage.removeItem("filmesSalvos");

      const page = Math.floor(Math.random() * 80) + 1;

      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          language: "pt-BR",
          sort_by: "popularity.desc",
          include_adult: false,
          certification_country: "BR",
          certification_lte: "12",
          page,
        },
      });

      const palavrasBanidas = [
        "sexo",
        "erótico",
        "adulto",
        "sensual",
        "nude",
        "sedução",
        "acompanhante",
        "prostituta",
        "69",
        "strip",
        "porn",
        "cláudia",
        "prazer",
        "orgasmo",
      ];

      const generosBanidos = [10749, 18]; // Romance e Drama

      const filmesFiltrados = response.data.results.filter((movie) => {
        const titulo = movie.title?.toLowerCase() || "";
        const tituloOriginal = movie.original_title?.toLowerCase() || "";
        const descricao = movie.overview?.toLowerCase() || "";

        const contemPalavraBanida = palavrasBanidas.some(
          (palavra) =>
            titulo.includes(palavra) ||
            tituloOriginal.includes(palavra) ||
            descricao.includes(palavra)
        );

        const contemGeneroBanido = movie.genre_ids?.some((id) =>
          generosBanidos.includes(id)
        );

        return (
          movie.adult === false &&
          movie.poster_path &&
          !contemPalavraBanida &&
          !contemGeneroBanido
        );
      });

      setMovies(filmesFiltrados);
      sessionStorage.setItem("filmesSalvos", JSON.stringify(filmesFiltrados));
    } catch (error) {
      console.error("Erro ao carregar filmes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Quando o componente monta, tenta carregar os filmes salvos no sessionStorage
  useEffect(() => {
    const filmesSalvos = sessionStorage.getItem("filmesSalvos");

    if (filmesSalvos) {
      setMovies(JSON.parse(filmesSalvos));
    } else {
      fetchMovies(); // Só busca da API se não houver nada salvo
    }
  }, []);

  return (
    <div className="bg-neutral-800 min-h-screen p-4 text-white text-center">
      <h1 className="text-5xl font-bold font-[Poppins]">MOVIES DATABASE</h1>
      <h2 className="text-3xl mt-2 mb-6 italic font-bold">Filmes 🎥🎞️</h2>

      <Button onClick={fetchMovies}>REFRESH🔁</Button>

      {loading ? (
        <p className="text-white mt-6">Carregando...</p>
      ) : (
        <ul className="flex flex-wrap justify-center gap-6 mt-6">
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
                <p className="mt-1 text-1xl">
                  Ano: {movie.release_date?.slice(0, 4)}📅
                </p>
                <p className="text-1-xl">
                  Avaliação: {movie.vote_average?.toFixed(1)}⭐
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default APITMDB;
