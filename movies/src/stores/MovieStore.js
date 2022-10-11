import { defineStore } from "pinia";

export const useMovieStore = defineStore("movieStorage", {
  state: () => ({ loadedMovies: [] }),

  getters: {
    getLoadedMovie: (state) => state.loadedMovies,
  },
  actions: {
    addMovie(newMovie) {
      // Check if Movie is already inside `state.loadedMovies`
      const movieExists = this.getLoadedMovie.find((movie) => {
        /* returns true or false */
        return movie.imdbID === newMovie.imdbID;
      });
      console.log(movieExists);
      console.log(newMovie);

      // If NewMovie DOES NOT exist, push to Store.
      if (movieExists === undefined) this.loadedMovies.push(newMovie);
    },
    getOneMovieById(movieId) {
      const myMovie = this.getLoadedMovie.find((movie) => {
        // Returns `movie object` or `undefined`
        return movie.imdbID === movieId;
      });

      return {
        movie: myMovie, // `movie object` or `undefined`
      };
    },
  },
});
