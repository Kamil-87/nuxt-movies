<template>
  <div class="flex flex-col px-20 mt-10">
    <div class="grid grid-cols-7 gap-1">
      <img class="col-span-2" :src="imgUrl" alt="">
      <div class="flex flex-col col-span-3">
        <div class="text-4xl font-sans font-bold mb-5">
          {{ data?.title }}
        </div>
        <div class="flex">
          <div
              v-for="genre in data?.genres"
              :key="genre.id"
              class="px-4 py-2 bg-gray-200 rounded mr-2 mb-2">
            {{ genre?.name }}
          </div>
        </div>

        <div class="text-lg my-2">Release Date: {{ data?.release_date }}</div>
        <div class="text-lg mb-2">Duration: {{ data?.runtime }} minutes</div>
        <div class="text-gray-600 text-m">{{ data?.overview }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useFetch, useRoute} from "#app";
import {useRuntimeConfig} from "#app/nuxt";
import {computed} from "@vue/reactivity";
import {Movie} from "~/types/Movie";

const route = useRoute()
const config = useRuntimeConfig()
const movieId = computed(() => route.params.id)

const {data} = await useFetch<Movie>(`/api/movies/${movieId.value}`)

// const imgUrl = computed(() => data.value?.poster_path ?
//     `${config.public.imgBaseUrl}/${data.value.poster_path}` :
//     'https://via.placeholder.com/300x500'
// )

const imgUrl = computed(() => 'https://via.placeholder.com/300x500')


</script>
