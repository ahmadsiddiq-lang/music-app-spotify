import { GetPlaylistByCategoryProps, getAlbumRecomend, getPlaylistByCategory } from "@/utility/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchPlaylistByCategory = ({ category_id }: GetPlaylistByCategoryProps) => {
  return useQuery({
    queryKey: ['playlists-by-category', category_id],
    queryFn: async () => await getPlaylistByCategory({ category_id })
  })
}
export const useFetchAlbumRecomend = () => {
  return useQuery({
    queryKey: ['albums-recomend'],
    queryFn: async () => await getAlbumRecomend()
  })
}