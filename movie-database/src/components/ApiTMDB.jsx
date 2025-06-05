import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "./Button";

// Variáveis de configuração da API do TMDB
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function APITMDB() {
  // Estado que armazena os filmes e o status de carregamento
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Função que busca os filmes na API e aplica filtros personalizados
  const fetchMovies = async () => {
    setLoading(true); // Ativa o estado de carregamento

    try {
      // Limpa o cache salvo para forçar nova requisição
      sessionStorage.removeItem("filmesSalvos");

      // Palavras que serão filtradas da descrição/título dos filmes
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

      // IDs de gêneros que serão filtrados (Romance e Drama)
      const generosBanidos = [10749, 18];

      const filmesFiltrados = [];
      const maxTentativas = 5; // Limita o número de tentativas para evitar loop infinito
      let tentativas = 0;

      // Garante que pelo menos 20 filmes válidos sejam retornados
      while (filmesFiltrados.length < 20 && tentativas < maxTentativas) {
        const page = Math.floor(Math.random() * 80) + 1; // Sorteia uma página aleatória

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

        // Filtra os filmes que atendem os critérios definidos
        const novosFilmes = response.data.results.filter((movie) => {
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

          // Retorna apenas filmes com poster, que não sejam adultos e que não contenham conteúdo banido
          return (
            movie.adult === false &&
            movie.poster_path &&
            !contemPalavraBanida &&
            !contemGeneroBanido
          );
        });

        // Adiciona apenas filmes que ainda não estão na lista
        novosFilmes.forEach((movie) => {
          if (!filmesFiltrados.find((m) => m.id === movie.id)) {
            filmesFiltrados.push(movie);
          }
        });

        tentativas++;
      }

      // Limita a lista final a 20 filmes (mesmo se vierem mais)
      const filmesFinal = filmesFiltrados.slice(0, 20);

      // Salva os filmes no sessionStorage para evitar novas buscas desnecessárias
      setMovies(filmesFinal);
      sessionStorage.setItem("filmesSalvos", JSON.stringify(filmesFinal));
    } catch (error) {
      console.error("Erro ao carregar filmes:", error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // useEffect executa uma única vez quando o componente é montado
  useEffect(() => {
    const filmesSalvos = sessionStorage.getItem("filmesSalvos");

    if (filmesSalvos) {
      // Se já houver filmes no sessionStorage, carrega direto da memória
      setMovies(JSON.parse(filmesSalvos));
    } else {
      // Se não houver, faz nova requisição
      fetchMovies();
    }
  }, []);

  return (
    <div className="bg-neutral-800 min-h-screen p-4 text-white text-center">
      <h1 className="text-5xl font-bold font-[Poppins]">MOVIES DATABASE</h1>
      <h2 className="text-3xl mt-2 mb-6 italic font-bold">Filmes 🎥🎞️</h2>

      {/* Botão para atualizar a lista de filmes */}
      <Button onClick={fetchMovies}>REFRESH🔁</Button>

      {/* Exibe carregamento ou a lista de filmes */}
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
                {/* Imagem do filme */}
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
