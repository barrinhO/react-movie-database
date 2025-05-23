import { Routes, Route } from "react-router-dom";
import APIOMDB from "./components/ApiTMDB.jsx";
import MovieDetails from "./pages/movieDetails.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<APIOMDB />} />
      <Route path="/detalhes" element={<MovieDetails />} />
    </Routes>
  );
}

export default App;
