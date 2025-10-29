export const API_BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchMoviesByType = async (type: string) => {
  try {
    const endPoint = `${API_BASE_URL}/movie/${type}`;
    const response = await fetch(endPoint, API_OPTIONS);
    if (!response.ok) throw new Error("Failed to fetch movies");
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchMovieTrailer = async (movieID: number) => {
  try {
    const endPoint = `${API_BASE_URL}/movie/${movieID}/videos`;
    const response = await fetch(endPoint, API_OPTIONS);
    if (!response.ok) throw new Error("Failed to fetch movie videos");
    const data = await response.json();

    const trailer = data.results.find(
      (video: { type: string; site: string }) =>
        video.type === "Trailer" && video.site === "YouTube"
    );

    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  } catch (error) {
    console.error("Error fetching movie trailer:", error);
    return null;
  }
};

export const fetchTrendingByType = async (type: string) => {
  try {
    const endPoint = `${API_BASE_URL}/trending/${type}/day`;
    const response = await fetch(endPoint, API_OPTIONS);
    if (!response.ok) throw new Error(`Failed to fetch trending ${type} `);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};
