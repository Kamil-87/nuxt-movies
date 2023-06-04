<template>
  <div class="flex flex-col px-20 mt-10">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-20">
      <img class="" :src="imgUrl" alt="">
      <div class="flex flex-col">
        <div class="text-4xl font-sans font-bold mb-5">
          {{ data?.name }}
        </div>
        <div class="flex">
          <div
              v-for="(genre) in data?.genres"
              :key="genre.id"
              class="px-4 py-2 bg-gray-200 rounded mr-2 mb-2">
            {{ genre.name }}
          </div>
        </div>

        <div class="text-lg my-2">Release Date: {{ data?.year }}</div>
        <div class="text-lg mb-2">Duration: {{ data?.movieLength }} minutes</div>
        <div class="text-gray-600 text-m">{{ data?.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useFetch, useRoute} from "#app";
import {useRuntimeConfig} from "#app/nuxt";
import {computed} from "@vue/reactivity";
import { Movie } from "~/types/Movie";

const route = useRoute()
const config = useRuntimeConfig()
const movieId = computed(() => route.params.id)

const { data } = await useFetch<Movie>(`/api/movies/${movieId.value}`)

const imgUrl = computed(() =>
    data.value?.poster ? data.value?.poster?.previewUrl : 'https://via.placeholder.com/300x500')

</script>
