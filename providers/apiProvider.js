import axios from "axios";

export async function getMovie(id) {
  return await axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export async function getPopularMovies() {
  return await axios
    .get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    )
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export async function getCast(id) {
  return await axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US`
    )
    .then((response) => {
      return response.data.cast;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export async function getWatchProviders(id) {
  return await axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US`
    )
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export async function getRecommendedMovies(id) {
  return await axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&page=1`
    )
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export async function getCollection(id) {
  return await axios
    .get(
      `https://api.themoviedb.org/3/collection/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US`
    )
    .then((response) => {
      return response.data.parts;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export async function getSearchResults(query, page = 1) {
  return await axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&query=${query}&page=${page}`
    )
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export async function getUpcomingMovies() {
  return await axios
    .get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US`
    )
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export async function getTopRatedMovies() {
  return await axios
    .get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US`
    )
    .then((response) => {
      console.log(response);
      return response.data.results;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export async function getCountry(lat, lng) {
  const url = `https://api.opencagedata.com/geocode/v1/json?key=${
    process.env.NEXT_PUBLIC_GEOCODING_KEY
  }&q=${encodeURIComponent(`${lat},${lng}`)}&pretty=1&no_annotations=1`;

  return await axios
    .get(url)
    .then((response) => {
      return response.data.results[0].components["ISO_3166-1_alpha-2"];
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}
