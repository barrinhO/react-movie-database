import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieInfo from "./MovieInfo";
import Button from "./Button";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function MovieDetails() {
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("id");
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          params: {
            api_key: API_KEY,
            language: "pt-BR",
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [movieId]);

  if (loading)
    return <p className="text-white text-center">Carregando detalhes...</p>;
  if (!movie)
    return <p className="text-white text-center">Filme não encontrado.</p>;

  return (
    <div className="bg-neutral-800 min-h-screen p-4 text-white text-center flex flex-col items-center">
      <h1 className="text-5xl font-bold font-[Poppins]">MOVIES DATABASE</h1>
      <h2 className="text-3xl mt-2 mb-6 font-bold italic">
        Detalhes do Filme 🎥
      </h2>

      <MovieInfo movie={movie} />

      <Button onClick={() => navigate(-1)}>Voltar</Button>
    </div>
  );
}

export default MovieDetails;
