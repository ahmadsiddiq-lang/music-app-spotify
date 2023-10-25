import { useTrackStore } from "@/pages/Album/storeAlbum"
import { usePlaying } from "@/utility/hooks/usePlaying"
import { Box, Flex, Heading, Image, Slide, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react"
import { useEffect, useMemo } from "react"
import { IoPauseOutline, IoPlaySharp, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5"
import { When } from "react-if"
import { useFetchTrackById } from "./query"

const FooterPlaying = () => {
  const [item, toggle] = useTrackStore((state) => [state.data, state.toggle, state.setToggle, state.reset])
  const { data: dataTrack, status: statusTrack, refetch } = useFetchTrackById(item.id, false)

  const { setPlay, stop, statusPlay, playing } = usePlaying()


  const styleIcon = useMemo(() => ({
    color: '#525050',
    size: 30
  }), [])


  // useEffect(() => {
  //   if (statusTrack == 'success') {
  //     setPlay(dataTrack.preview_url)
  //   }
  // }, [statusTrack, dataTrack])

  // useEffect(() => {
  //   if (item.id != '' && statusTrack != 'success') {
  //     refetch()
  //   }
  // }, [item.id, refetch])

  return (
    <Slide direction='bottom' in={toggle} style={{ zIndex: 10 }}>
      <When condition={statusTrack == 'success'}>
        <Box
          className="w-full bg-white"
        >
          <Slider aria-label='slider-ex-1' defaultValue={30}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Flex
            className="text-white w-full max-h-[100px] rounded-lg px-3 pb-3 justify-between min-h-[100px]">
            <Flex className="items-center">
              <Image src={dataTrack?.album.images[0].url} className="max-w-[70px]" />
              <Box className="text-black ml-3">
                <Heading size={"sm"}>{dataTrack?.name}</Heading>
                <Text className="text-[12px]">{dataTrack?.artists[0].name}</Text>
              </Box>
            </Flex>
            <Box className="flex items-center gap-4" p={0}>
              <div onClick={() => stop()}>
                <IoPlaySkipBack {...styleIcon} />
              </div>
              <div onClick={() => playing()}>
                {statusPlay ? <IoPauseOutline {...styleIcon} /> : <IoPlaySharp {...styleIcon} />}
              </div>
              <div>
                <IoPlaySkipForward {...styleIcon} />
              </div>

            </Box>
          </Flex>
        </Box>
      </When>
    </Slide>
  )
}

export default FooterPlaying