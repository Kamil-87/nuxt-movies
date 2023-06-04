<template>
  <div class="flex flex-col py-10">
    <h2 class="text-2xl font-bold text-center">Nuxt Movies</h2>
    <div class="flex justify-center items-center h-32">
      <input
          class="px-2 py-1 border border-gray-800 rounded-md min-w-64"
          type="text"
          placeholder="Search..."
          v-model="searchTerm"
          @input="searchValue"
      >
    </div>

    <div

        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 self-center gap-x-10 gap-y-10 mb-10">
      <div
          v-for="movie in moviesData?.docs"
          :key="movie?.id"
      >
        <MovieCard :movie="movie" />

      </div>
    </div>
    <div v-if="moviesData?.docs.length > 0" class="flex justify-center">
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

  const searchTerm = ref('')
  const page = ref(1)
  const moviesData = ref({docs: []})

  const url = computed(() => {
    return `api/movies/search?query=${searchTerm.value}&page=${page.value}`;
  })

  const searchValue = () => {
    debounce(fetchData(), 500)
  }


  const debounce = (func, ms) => {
    let timeout = null

    return function() {
      const funcCall = () => { func.apply(this, arguments) }
      clearTimeout(timeout)
      timeout = setTimeout(funcCall, ms)
    }
  }

  const fetchData = async () => {
    const { data } = await useFetch<APIResponse>(url.value)
    moviesData.value = data.value
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
