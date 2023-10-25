import { NextIcon, PreviousIcon, RepeatIcon, SoundIcon, ThumSliderIcon } from "@/assets"
import { Wrapper } from "@/components"
import { AlbumListType, Item } from "@/utility/api/albums_list_type"
import { timerSet } from "@/utility/function/common"
import { usePlaying } from "@/utility/hooks/usePlaying"
import { Box, Button, Card, CardBody, CardFooter, Center, Flex, Heading, Image, Slide, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, useDisclosure } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { IoPauseOutline, IoPlaySharp } from "react-icons/io5"
import { useParams } from "react-router-dom"
import { useFetchAlbumsById } from "../Album/query"

type ItemViewTipe = {
  image?: string,
  artist_name?: string,
  track_name?: string,
  preview_url?: string
}

const Playing = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { id } = useParams()
  const idAlbum = id?.split('&')[0]
  const idItem = id?.split('&')[1]
  const { data: dataAlbum, status: statusFetchAlbum } = useFetchAlbumsById(idAlbum || '')
  const [listTrack, setListTrack] = useState<Item[]>()
  const [item, setItem] = useState<ItemViewTipe>()
  const { setPlay, playing, currentTrack, play } = usePlaying()
  const [trackProgress, setTrackProgress] = useState(0);
  const [maxTrack, setMaxTrack] = useState(0);
  const [volume, setVolume] = useState(30);
  const timeRef = useRef(0)

  const handleClickProgress = (e: number) => {
    play(e)
    setTrackProgress(e)
  }

  const handleNext = (tracks?: AlbumListType) => {
    const trackItem = listTrack ? listTrack : tracks?.tracks.items
    if (trackItem && dataAlbum) {
      const indexTrack = trackItem?.findIndex(e => e.preview_url == item?.preview_url)
      const track = (indexTrack + 1) < trackItem?.length ? trackItem[(indexTrack + 1)] : trackItem[0]
      const data: ItemViewTipe = {
        image: dataAlbum.images[0].url,
        artist_name: dataAlbum.artists[0].name,
        preview_url: track.preview_url,
        track_name: track.name
      }
      setItem(data)
      setPlay(track.preview_url)
    }
  }

  const handlePrevous = () => {
    if (listTrack) {
      const indexTrack = listTrack?.findIndex(e => e.preview_url == item?.preview_url)
      const track = (indexTrack - 1) > 0 ? listTrack[(indexTrack - 1)] : listTrack[listTrack.length - 1]
      const data: ItemViewTipe = {
        ...item,
        preview_url: track.preview_url,
        track_name: track.name
      }
      setItem(data)
      setPlay(track.preview_url)
    }
  }

  const startTimer = (data?: AlbumListType) => {
    clearInterval(timeRef.current);
    timeRef.current = setInterval(async () => {
      if (currentTrack.ended) {
        // clearInterval(timeRef.current);
        handleNext(data);
      } else {
        const cTime = Math.round(currentTrack.currentTime)
        const dTime = Math.round(currentTrack.duration)
        setTrackProgress(cTime)
        setMaxTrack(dTime)
      }
    }, 1000);
  };

  useEffect(() => {
    if (statusFetchAlbum == 'success') {
      const track = dataAlbum.tracks.items.find(e => e.id == idItem)
      const data: ItemViewTipe = {
        image: dataAlbum.images[0].url,
        artist_name: dataAlbum.artists[0].name,
        track_name: track?.name ?? '',
        preview_url: track?.preview_url ?? ''
      }
      setItem(data)
      setListTrack(dataAlbum.tracks.items)
      if (currentTrack.src != track?.preview_url) {
        currentTrack.pause()
        currentTrack.currentTime = 0
        currentTrack.volume = volume / 100
      }
      setPlay(track?.preview_url ?? '')
      startTimer(dataAlbum)
    }

    return () => {
      const track = dataAlbum?.tracks.items.find(e => e.id == idItem)
      if (currentTrack.src == track?.preview_url) {
        clearInterval(timeRef.current);
        // currentTrack.pause()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFetchAlbum, idItem])

  const handleVolume = (v: number) => {
    currentTrack.volume = v / 100
    setVolume(v)
  }

  return (
    <Wrapper header={false}>
      <Center mt={5}>
        <Heading size={'lg'}>Playing Now</Heading>
      </Center>
      <Card mt={'16'} shadow={0} border={0}>
        <Center flexDirection={'column'}>
          <CardBody overflow={'hidden'} rounded={'lg'} shadow={'lg'} p={0} cursor={'pointer'}>
            <Image src={item?.image} objectFit={'cover'} w={261} maxH={261} />
          </CardBody>
          <CardFooter flexDirection={'column'} alignItems={'center'}>
            <Heading size={'lg'} textAlign={'center'}>{item?.track_name}</Heading>
            <Text mt={3} color={'gray.500'}>{item?.artist_name}</Text>
          </CardFooter>
        </Center>
      </Card>

      <Flex justifyContent={'space-between'} px={5} mt={'10'}>
        <RepeatIcon />
        <SoundIcon onClick={() => onToggle()} />
      </Flex>
      <Box mt={'10'} px={5}>
        <Flex justifyContent={'space-between'}>
          <Text className="text-sm line-clamp-2">{timerSet(Math.round(trackProgress))}</Text>
          <Text className="text-sm line-clamp-1">{timerSet(Math.round(currentTrack.duration ? currentTrack.duration : 0))}</Text>
        </Flex>
        <Slider aria-label='slider-ex-4' max={maxTrack} value={trackProgress} onChange={handleClickProgress}>
          <SliderTrack bg='red.100'>
            <SliderFilledTrack bg='tomato' />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color='tomato' as={ThumSliderIcon} />
          </SliderThumb>
        </Slider>
      </Box>
      <Flex mt={'28'} justifyContent={'center'} gap={10}>
        <Button variant={'ghost'} onClick={() => handlePrevous()}>
          <PreviousIcon />
        </Button>
        <Button variant={'ghost'} onClick={() => playing()}>
          {currentTrack.paused ? <IoPlaySharp size={30} /> : <IoPauseOutline size={30} />}
        </Button>
        <Button variant={'ghost'} onClick={() => handleNext()}>
          <NextIcon />
        </Button>
      </Flex>
      <Slide direction="right" in={isOpen} style={{ zIndex: 10 }} className="h-[130px] mt-[390px] max-w-[50px] overflow-hidden">
        <Box className="flex flex-col items-end pr-[27px]" >
          <Slider
            aria-label='slider-ex-3'
            value={volume}
            orientation='vertical'
            minH={120}
            onChange={handleVolume}
            max={100}
            min={0}
          >
            <SliderTrack>
              <SliderFilledTrack bg='tomato' />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </Slide>
    </Wrapper>
  )
}

export default Playing