// import {useRuntimeConfig} from "nuxt/app";
import {defineEventHandler, getRouterParams} from "h3";

export default defineEventHandler((event) => {
    const params = getRouterParams(event)
    const id = Object.values(params)[0]

    return $fetch(`https://api.kinopoisk.dev/v1.3/movie/${id}`, {
        method: "GET",
        headers: {
            "X-API-KEY": `JZECDFK-EP4M1K4-PVC6RNQ-535G8H9`
        }
    })
})
