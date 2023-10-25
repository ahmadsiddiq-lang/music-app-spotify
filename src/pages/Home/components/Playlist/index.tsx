import { CardItem } from "@/components"
import { Center, Heading, SimpleGrid, Spinner } from "@chakra-ui/react"
import { useFetchPlaylistByCategory } from "../../query"
import { When } from "react-if"

const Playlist = () => {

  const { data: dataPlaylist, status: statusPlaylist } = useFetchPlaylistByCategory({ category_id: 'toplists' })

  return (
    <div>
      <Heading size={'md'} px={5}>Top Playlist</Heading>
      <SimpleGrid columns={2} spacing={5} p={5}>
        <When condition={statusPlaylist == 'success'}>
          {
            dataPlaylist?.playlists.items.map((item) => {
              return (
                <CardItem
                  key={item.id}
                  url={item.images[0].url}
                  heading={item.name}
                  text={item.description}
                />
              )
            })
          }
        </When>
        <When condition={statusPlaylist == 'pending'}>
          <Center>
            <Spinner />
          </Center>
        </When>
      </SimpleGrid>
    </div>
  )
}

export default Playlist