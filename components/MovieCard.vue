<template>
  <NuxtLink :to="`/movies/${movie?.id}`" class="h-128 w-64 border flex flex-col text-center">
    <div class="mb-10 bg-green-600 inline-block">
      <img
          class="transform hover:translate-x-6 hover:-translate-y-6  delay-50 duration-100 inline-block"
          :src="imgUrl"
          alt="Movie Poster"
      >
    </div>
    <div class="text-lg">
      {{ movie?.name }}
    </div>
    <p class="text-m text-gray-500 break-words text-wrap truncate overflow-hidden px-2">
      {{ movie?.shortDescription }}
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";
import {Movie} from "~/types/Movie";
import { computed } from '#imports'

const props = defineProps({
  movie: {
    type: Object as PropType<Movie>
  }
})

const imgUrl = computed(() =>
    props.movie?.poster ? props.movie.poster : 'https://via.placeholder.com/300x500')

// const imgUrl = computed(() => 'https://via.placeholder.com/300x500')

</script>
