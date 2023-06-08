<template>
  <div class="flex flex-col py-10">
    <h2 class="text-2xl font-bold text-center">Фильмы на NUXT 3</h2>
    <p class="font-normal text-center">Доступно 200 запросов в день</p>
    <div class="flex justify-center items-center h-32">
      <input
          ref="refInput"
          class="px-2 py-1 border border-gray-800 rounded-md min-w-64"
          type="text"
          placeholder="Найти..."
          v-model="searchTerm"
      >
    </div>

    <div
        v-if="moviesData?.docs?.length > 0"
        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 self-center gap-x-10 gap-y-10 mb-10">
      <div
          v-for="movie in moviesData?.docs"
          :key="movie?.id"
      >
        <MovieCard :movie="movie" />
      </div>
    </div>
    <div v-if="moviesData?.docs?.length > 0" class="flex justify-center">
      <button
          v-if="!disabledPrevious"
          @click="previousPage"
          class="px-4 py-2 text-m border rounded-lg"
      >Previous</button>
      <button class="px-4 py-2 text-m border rounded-lg">{{ page }}</button>
      <button
          v-if="!disabledNext"
          class="px-4 py-2 text-m border rounded-lg"
          @click="nextPage"
      >Next</button>
    </div>

  </div>
</template>

<script setup lang="ts">
  import { ref, computed, useFetch } from '#imports'
  import { APIResponse } from "~/types/APIResponse";
  import { watchDebounced } from '@vueuse/core'
  import {onMounted} from "@vue/runtime-core";

  const refInput = ref(null)
  const searchTerm = ref('')
  const page = ref(1)
  const moviesData = ref({docs: []})

  const url = computed(() => {
    return `api/movies/search?query=${searchTerm.value}&page=${page.value}`;
  })

  onMounted(() => {
    refInput.value.focus()
  })

  watchDebounced(
      searchTerm,
      fetchData,
      { debounce: 500 },
  )

  const { data } = await useFetch<APIResponse>(url.value)
  moviesData.value = data.value

  async function fetchData() {
    if (searchTerm.value.length > 1) {
      const {data} = await useFetch<APIResponse>(url.value)
      moviesData.value = data.value
    } else {
      moviesData.value = []
    }
  }

  const nextPage = () => {
    page.value++
    fetchData()
  }

  const previousPage = () => {
    page.value--
    fetchData()
  }

  const disabledPrevious = computed(() => {
    return page.value === 1
  })

  const disabledNext = computed(() => {
    return page.value + 1 === moviesData?.value.pages
  })
</script>
