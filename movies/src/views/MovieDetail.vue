<template>
  <div class="movie-detail">
    <h2>{{ movie.Title }}</h2>
    <p>{{ movie.Year }} rated: {{ movie.Rated }}</p>
    <img :src="movie.Poster" alt="Movie Poster" class="featured-img" />
    <p>{{ movie.Plot }}</p>
    <p></p>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import env from "@/env.js";
import { useMovieStore } from "@/stores/MovieStore";

export default {
  setup() {
    const movie = ref({});
    const route = useRoute();

    const storedMovies = useMovieStore();

    onBeforeMount(() => {
      const storedMovie = storedMovies.getOneMovieById(route.params.id);
      console.log(storedMovie);

      if (storedMovie.movie !== undefined) {
        console.log("Movie Found in Store!");
        movie.value = storedMovie.movie;
      } else {
        console.log("No Movie Found in Store, calling API . . . ");
        fetch(
          `http://www.omdbapi.com/?apikey=${env.apikey}&i=${route.params.id}&plot=full`
        )
          .then((response) => response.json())
          .then((data) => {
            storedMovies.addMovie(data);
            movie.value = data;
          });
      }
    });

    return {
      movie,
    };
  },
};
</script>

<style lang="scss">
.movie-detail {
  padding: 16px;

  h2 {
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .featured-img {
    display: block;
    max-width: 200px;
    margin-bottom: 16px;
  }

  p {
    color: #fff;
    font-size: 18px;
    line-height: 1.4;
  }
}
</style>
