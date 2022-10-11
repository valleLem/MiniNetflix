<script>
export default {
  props: {
    id: String,
    image: String,
    type: {
      type: String,
      default: `Movie`,
    },
    year: String,
    title: String,
    rated: String,
  },
};
</script>

<template>
  <div class="movie">
    <router-link :to="'/movie/' + id" class="movie-link">
      <div class="product-image">
        <img :src="image" alt="Movie Poster" />
        <div class="type">{{ type }}</div>
      </div>
      <div class="detail">
        <p class="year">{{ year }}</p>
        <h3>{{ title }}</h3>
      </div>
    </router-link>
  </div>
</template>
