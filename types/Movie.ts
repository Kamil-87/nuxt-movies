interface Poster {
    previewUrl: string
    url: string
}

interface Genres {
    name: string
}

export type Movie = {
    id: number
    name: string
    genres: string[] | Genres[]
    year: string
    movieLength: number | null
    description?: string
    shortDescription?: string
    poster: string | Poster
}
