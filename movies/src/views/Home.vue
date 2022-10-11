<template>
  <div class="home">
    <div class="feature-card">
      <img
        src="https://img.freepik.com/free-vector/online-cinema-banner-with-open-clapper-board-film-strip_1419-2242.jpg?w=2000"
        alt="Banner Poster"
        class="featured-img"
      />
      <div class="detail">
        <h3>Show must go on</h3>
      </div>
    </div>

    <form @submit.prevent="SearchMovies()" class="search-box">
      <input
        type="text"
        placeholder="What are you looking for?"
        v-model="search"
      />
      <input type="submit" value="Search" />
    </form>

    <div class="movies-list">
      <template v-for="movie in movies">
        <Movie
          :id="movie.imdbID"
          :image="movie.Poster"
          :type="movie.Type"
          :year="movie.Year"
          :title="movie.Title"
        />
      </template>

      <div class="thumbnail">
        <h3>Recommended</h3>
        <div class="movies-list">
          <Movie
            id="tt0172495"
            image="https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
            year="2012"
            title="Gladiator"
          />

          <Movie
            id="tt0328107"
            image="https://m.media-amazon.com/images/M/MV5BODFlMmEwMDgtYjhmZi00ZTE5LTk2NWQtMWE1Y2M0NjkzOGYxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
            year="2012"
            title="Man on Fire"
          />

          <Movie
            id="tt0499549"
            image="https://m.media-amazon.com/images/M/MV5BNjA3NGExZDktNDlhZC00NjYyLTgwNmUtZWUzMDYwMTZjZWUyXkEyXkFqcGdeQXVyMTU1MDM3NDk0._V1_SX300.jpg"
            year="2012"
            title="Avatar"
          />

          <Movie
            id="tt1197624"
            image="https://m.media-amazon.com/images/M/MV5BNTQ1NmZlNDktZTg0NS00ZjNhLTk5M2QtNzExNjUzY2MwMjliXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
            year="2012"
            title="Law Abiding Citizen"
          />
          <Movie
            id="tt2294629"
            image="https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg"
            year="2012"
            title="Frozen"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import env from "@/env.js";
import Movie from "../components/Movie.vue";

export default {
  components: { Movie },
  setup() {
    const search = ref("");
    const movies = ref([]);

    const SearchMovies = () => {
      if (search.value !== "") {
        fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&s=${search.value}`)
          .then((response) => response.json())
          .then((data) => {
            movies.value = data.Search;
            search.value = "";
          });
      }
    };

    return {
      search,
      movies,
      SearchMovies,
    };
  },
};
</script>

<style lang="scss">
.home {
  .feature-card {
    position: relative;

    .featured-img {
      display: block;
      width: 100%;
      height: 150px;
      object-fit: cover;

      position: relative;
      z-index: 0;
    }

    .detail {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 16px;
      z-index: 1;

      h3 {
        color: #fff;
        margin-bottom: 16px;
      }

      p {
        color: #fff;
      }
    }
  }

  .search-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;

    input {
      display: block;
      appearance: none;
      border: none;
      outline: none;
      background: none;

      &[type="text"] {
        width: 100%;
        color: #fff;
        background-color: #496583;
        font-size: 20px;
        padding: 10px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        transition: 0.4s;

        &::placeholder {
          color: #f3f3f3;
        }

        &:focus {
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
        }
      }

      &[type="submit"] {
        width: 100%;
        max-width: 300px;
        background-color: #42b883;
        padding: 16px;
        border-radius: 8px;
        color: #fff;
        font-size: 20px;
        text-transform: uppercase;
        transition: 0.4s;

        &:active {
          background-color: #3b8070;
        }
      }
    }
  }

  .movies-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0px 8px;

    .movie {
      min-width: 20%;
      max-width: 20%;
      width: 20%;
      flex: 1 1 50%;
      padding: 16px 8px;

      .movie-link {
        display: flex;
        flex-direction: column;
        height: 100%;

        .product-image {
          position: relative;
          display: block;

          img {
            display: block;
            width: 100%;
          }

          .type {
            position: absolute;
            padding: 8px 16px;
            background-color: #42b883;
            color: #fff;
            bottom: 16px;
            left: 0px;
            text-transform: capitalize;
          }
        }

        .detail {
          background-color: #496583;
          padding: 16px 8px;
          flex: 1 1 100%;
          border-radius: 0px 0px 8px 8px;

          .year {
            color: #aaa;
            font-size: 16px;
          }

          .rated {
            color: #aaa;
            font-size: 14px;
          }

          h3 {
            color: #fff;
            font-weight: 600;
            font-size: 20px;
          }
        }
      }
    }
  }

  .thumbnail {
    width: 100%;
    color: #fff;
    font-size: 20px;
    padding: 10px 20px;
    border-radius: 8px;
    margin-bottom: 15px;
  }

  @media only screen and (max-width: 600px) {
    .movies-list .movie {
      min-width: 100%;
      max-width: 100%;
      width: 100%;
    }
  }

  @media only screen and (min-width: 600px) {
    .movies-list .movie {
      min-width: 50%;
      max-width: 50%;
      width: 50%;
    }
  }

  @media only screen and (min-width: 1000px) {
    .movies-list .movie {
      min-width: 20%;
      max-width: 20%;
      width: 20%;
    }
  }
}
</style>
