import App from "../App.tsx";
import MovieDetail from "../pages/MovieDetail.tsx";
import MovieDiscover from "../pages/MovieDiscover.tsx";
import { Routes, Route } from "react-router";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="movie/:id" element={<MovieDetail />} />
    <Route path="discover" element={<MovieDiscover />} />
  </Routes>
);
