import { useCallback, useRef, useState } from "react";

export const usePlaying = () => {
  const [url, setUrl] = useState('')
  const [volume, setVolume] = useState(0.1)
  const track = useRef(new Audio(url))
  const [statusPlay, setStatus] = useState(!track.current.paused)

  const play = useCallback(() => {
    track.current.volume = volume
    track.current.play()
    setStatus(true)
  }, [volume])

  const stop = useCallback(() => {
    track.current.pause()
    track.current.currentTime = 0
    track.current.src = ''
    setStatus(false)
  }, [track])

  const pause = useCallback(() => {
    track.current.pause()
    setStatus(false)
  }, [])

  const playing = useCallback(() => {
    if (!track.current.paused) {
      pause()
    } else {
      play()
    }
  }, [play, pause])

  const reset = () => {
    if (track?.current.src != '') {
      stop();
      setUrl('')
    }
  }

  const setPlay = (newUrl: string) => {
    if (track.current.src != url) {
      track.current.src = newUrl
      track.current.volume = volume
      track.current.autoplay = true
      setStatus(true)
      setUrl(newUrl);
    } else {
      stop()
      track.current.src = newUrl
      track.current.volume = volume
      track.current.autoplay = true
      setStatus(true)
      setUrl(newUrl);
    }
  }

  const duration = () => {
    return track.current.duration
  }

  return {
    play,
    pause,
    stop,
    setPlay,
    reset,
    setVolume,
    duration,
    playing,
    statusPlay,
    url,
    setUrl
  }
}