import {useRuntimeConfig} from "nuxt/app";

export default defineEventHandler((event) => {
    const id = [...event.node.req.url.split("/")].pop()
    const config = useRuntimeConfig()
    return $fetch(`${config.apiBaseUrl}/search/movie?query=${query}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${config.apiKey}`
        }
    })
})
