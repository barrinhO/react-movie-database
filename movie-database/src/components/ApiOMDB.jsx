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
    <div>
      <h2>Filmes</h2>
      <ul>
        {movies.map((filme) => (
          <li key={filme.id}>
            <strong>{filme.title}</strong>
            <br />
            <img
              src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`}
              alt={filme.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default APIOMDB;
