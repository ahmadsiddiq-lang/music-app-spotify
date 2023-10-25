import { getTrackByAlbumId, getTrackById } from "@/utility/api"
import { useQuery } from "@tanstack/react-query"

export const useFetchTrackById = (id: string) => {
  return useQuery({
    queryKey: ['track', id], // unique key for this query
    queryFn: async () => await getTrackById(id)
  })
}

export const useFetchTrackByAlbumId = (id: string) => {
  return useQuery({
    queryKey: ['track', id], // unique key for this query
    queryFn: async () => await getTrackByAlbumId(id)
  })
}