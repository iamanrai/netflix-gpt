import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = () => {
  // Fetch Data from TMDB API and update Redux Store
  const dispatch = useDispatch();

  const getPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json.results);
    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    getPlayingMovies();
    // eslint-disable-next-line
  }, []);
};

export default useNowPlayingMovies;
// This custom hook fetches the now playing movies from the TMDB API and updates the Redux store with the fetched data.
