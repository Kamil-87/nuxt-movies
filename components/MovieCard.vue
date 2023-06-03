<template>
  <NuxtLink :to="`/movies/${movie?.id}`" class="h-128 w-64 border flex flex-col text-center">
    <div class="mb5 bg-green-600 inline-block">
      <img
          class="transform hover:translate-x-6 hover:-translate-y-6  delay-50 duration-100 inline-block"
          :src="imgUrl"
          alt="Movie Poster"
      >
    </div>
    <div class="text-lg">
      {{ movie?.title }}
    </div>
    <p class="text-m text-gray-500 break-words text-wrap truncate overflow-hidden px-2">
      {{ movie?.overview }}
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";
import {Movie} from "~/types/Movie";
import {useRuntimeConfig} from "nuxt/app";
import {computed} from "@vue/reactivity";

const props = defineProps({
  movie: {
    type: Object as PropType<Movie>
  }
})

const config = useRuntimeConfig()
// const imgUrl = computed(() =>
//     props.movie?.poster_path !== null ?
//         `${config.public.imgBaseUrl}/${props.movie.poster_path}` :
//         'https://via.placeholder.com/300x500')

const imgUrl = computed(() => 'https://via.placeholder.com/300x500')

</script>
