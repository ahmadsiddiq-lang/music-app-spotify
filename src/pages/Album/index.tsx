import { Wrapper } from "@/components"
import { Box, Heading, Image, Text } from "@chakra-ui/react"
import dayjs from "dayjs"
import { IoPauseCircleOutline, IoPlaySharp } from "react-icons/io5"
import { When } from "react-if"
import { useNavigate, useParams } from "react-router-dom"
import { useFetchAlbumsById } from "./query"
import { useAlbumStore, useTrackStore } from "./storeAlbum"
import { usePlaying } from "@/utility/hooks/usePlaying"

const Album = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: dataPlaylist, status: statusFetchPlaylist } = useFetchAlbumsById(id ?? '')
  const [setData, reset] = useTrackStore((state) => [state.set, state.reset])
  const [setDataAlbum] = useAlbumStore((state) => [state.set])
  const { url, setUrl, statusPlay } = usePlaying()


  return (
    <Wrapper header={false} className="max-h-[100vh]" props={{
      overflowY: 'hidden',
    }}>
      <When condition={statusFetchPlaylist == 'success'}>
        <Box p={5} className="flex border-b-2">
          <Image src={dataPlaylist?.images[0].url} className="rounded-lg" h={120} />
          <Box className="ml-5">
            <Heading className="line-clamp-1">{dataPlaylist?.artists[0].name}</Heading>
            <Text className="line-clamp-2">{dataPlaylist?.name}</Text>
            <Text>{dayjs(dataPlaylist?.release_date).year()}</Text>
          </Box>
        </Box>
        <Box className="overflow-y-auto max-h-[82vh] pb-[130px] pt-3">
          {
            dataPlaylist?.tracks.items.map((item) => {
              return (
                <Box
                  onClick={() => {
                    // reset()
                    // setUrl(item.preview_url)
                    // setData(item)
                    setDataAlbum(dataPlaylist)
                    navigate(`/playing/${id}&${item.id}`)
                  }}
                  key={item.id} py={2} px={5} className="flex justify-between items-center">
                  <Text>{item.name}</Text>
                  {
                    item.preview_url == url && statusPlay ? <IoPauseCircleOutline color={'#474747'} /> : <IoPlaySharp color={'#c7c7c7'} />
                  }
                </Box>
              )
            })
          }
        </Box>
      </When>
    </Wrapper>
  )
}

export default Album