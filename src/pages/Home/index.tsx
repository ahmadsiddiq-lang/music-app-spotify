import Wrapper from "@/components/Wrapper"
import Recomend from "./components/Recomend"
import Playlist from "./components/Playlist"

const Home = () => {
  return (
    <Wrapper className="flex flex-col gap-5">
      <Recomend />
      <Playlist />
    </Wrapper>
  )
}

export default Home