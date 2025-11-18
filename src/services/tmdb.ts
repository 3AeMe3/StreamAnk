import type { Movie } from "../interfaces/movie";

export const API_BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;

const API_OPTIONS: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

//Helper generico para evitar repetir codigo
async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, API_OPTIONS);
    if (!response.ok) throw new Error(`TMDB error : ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}: `, error);
    throw error;
  }
}

//peliculas por tipo => documentacion de TMDB
export async function fetchMoviesByType(type: string): Promise<Movie[]> {
  const data = await fetchFromTMDB<{ results: Movie[] }>(`/movie/${type}`);
  return data.results || [];
}

export async function fetchTrendingByType(type: string): Promise<Movie[]> {
  const data = await fetchFromTMDB<{ results: Movie[] }>(
    `/trending/${type}/day`
  );
  return data.results || [];
}

//trailer movies(youtube)
interface Video {
  key: string;
  type: string;
  site: string;
}

export async function fetchMovieTrailer(
  movieID: number
): Promise<string | null> {
  const data = await fetchFromTMDB<{ results: Video[] }>(
    `/movie/${movieID}/videos`
  );
  const trailer = data.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  return trailer ? `https://youtube.com/watch?v=${trailer.key}` : null;
}

interface Credit {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export async function fetchCredits(movieId: number): Promise<Credit[]> {
  const data = await fetchFromTMDB<{ cast: Credit[] }>(
    `/movie/${movieId}/credits`
  );
  return data.cast;
}

export async function fetchSimilarMovies(movieId: number): Promise<Movie[]> {
  const data = await fetchFromTMDB<{ results: Movie[] }>(
    `/movie/${movieId}/similar`
  );
  return data.results;
}

export async function fetchFindByID(id: number): Promise<Movie> {
  return await fetchFromTMDB<Movie>(`/movie/${id}`);
}

export async function fetchBySearch(query: string): Promise<Movie[]> {
  const data = await fetchFromTMDB<{ results: Movie[] }>(
    `/search/movie?query=${encodeURIComponent(query)}`
  );
  return data.results;
}
