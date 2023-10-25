import { getTrackById } from "@/utility/api"
import { useQuery } from "@tanstack/react-query"

export const useFetchTrackById = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['track-by-id'], // unique key for this query
    queryFn: async () => await getTrackById(id),
    enabled
  })
}