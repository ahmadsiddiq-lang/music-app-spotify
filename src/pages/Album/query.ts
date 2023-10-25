import { getAlbumsById } from "@/utility/api"
import { useQuery } from "@tanstack/react-query"

export const useFetchAlbumsById = (id: string) => {
  return useQuery({
    queryKey: ['albums-by-id', id], // unique key for this query
    queryFn: async () => await getAlbumsById(id)
  })
}