
export default defineEventHandler((event) => {
    const {query, page} = getQuery(event)
    const config = useRuntimeConfig()

    console.log(query, page)
    return $fetch(`${config.apiBaseUrl}/search/movie?query=${query}&page=${page}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${config.apiKey}`
        }
    })
})
