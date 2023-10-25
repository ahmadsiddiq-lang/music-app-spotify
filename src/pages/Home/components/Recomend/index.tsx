import { CardItem } from "@/components"
import Swaper from "@/components/Swaper"
import { Heading } from "@chakra-ui/react"
import { useFetchAlbumRecomend } from "../../query"
import { When } from "react-if"
import { useNavigate } from "react-router-dom"

const Recomend = () => {

  const { data: dataAlbums, status: statusAlbums } = useFetchAlbumRecomend()
  const navigate = useNavigate()

  // Main components
  return (
    <div>
      <Heading size={'md'} p={5}>Recommended for you</Heading>
      <Swaper>
        <When condition={statusAlbums == 'success'}>
          {
            dataAlbums?.tracks.map((item) => {
              return (
                <CardItem
                  onClick={() => navigate(`/album/${item.album.id}`)}
                  key={item.id}
                  className="snap-always snap-center"
                  props={{
                    minW: 150,
                    maxH: 220,
                  }}
                  url={item.album.images[0].url}
                  heading={item.album.name}
                  text={item.album.artists[0].name}
                  class_text="line-clamp-1"
                />
              )
            })
          }
        </When>
      </Swaper>
    </div>
  )
}

export default Recomend