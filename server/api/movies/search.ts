// import {useRuntimeConfig} from "nuxt/app";
import {defineEventHandler, getQuery} from "h3";

export default defineEventHandler((event) => {
    const {query, page} = getQuery(event)
    // const config = useRuntimeConfig()

    // console.log('config', config)
    console.log(query, page)
    // $fetch(`${config.apiBaseUrl}/search/movie?query=${query}&page=${page}`

    return $fetch(`https://api.kinopoisk.dev/v1.2/movie/search?query=${query}?page=${page}&limit=4`, {
        method: "GET",
        headers: {
            "X-API-KEY": `JZECDFK-EP4M1K4-PVC6RNQ-535G8H9`
        }
    })
})
